import { EventEmitter, Inject, Injectable } from '@angular/core';
import AgoraRTC, { IAgoraRTCClient, ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng';
import { Observable } from 'rxjs';
import { IChannelClient, AgoraConfig } from './agora-config';
import { ConnectionState, IRemoteAudioTrack, IRemoteUser, IRemoteVideoTrack, UserState } from './types';

@Injectable({
    providedIn: 'root'
})
export class NgxAgoraSdkNgService {

    private localVideoPlayerElement!: string | HTMLElement;
    private localVideoTrack!: ICameraVideoTrack;
    private localAudioTrack!: IMicrophoneAudioTrack;
    private client!: IAgoraRTCClient;
    private channel!: IChannelClient;
    private _userStateEvent: EventEmitter<UserState> = new EventEmitter();
    private _connectionStatusChangeEvent: EventEmitter<{ current: ConnectionState, previous: ConnectionState }> = new EventEmitter();
    public remoteUsers!: Array<IRemoteUser>;

    constructor(@Inject('config') private config: AgoraConfig) {

        if (!this.config) {
            console.error("AgoraConfig shoudn't be NULL. You have to condifure NgxAgoraSdkNgModule.forRoot({ AppId:'' })");
            return;
        }

        if (!this.checkSystemRequirements()) {
            this.logger('error', 'Web RTC is not supported');
        }

        this.client = this.createClient();
        this.channel = this.createChannelClient();

    }

    private logger(type: string, message: string): void {
        switch (type) {
            case 'error':
                AgoraRTC.setLogLevel(0);
                break;
            case 'warning':
                AgoraRTC.setLogLevel(2);
                break;
            case 'info':
                AgoraRTC.setLogLevel(1);
                break;
            case 'debug':
                AgoraRTC.setLogLevel(3)
                break;
            default:
                AgoraRTC.setLogLevel(4);
        }
    }

    public checkSystemRequirements(): boolean {
        return AgoraRTC.checkSystemRequirements();
    }

    public remoteUsersStatusChange(): Observable<UserState> {
        return this._userStateEvent.asObservable();
    }

    public connectionStatusChange(): Observable<{ current: ConnectionState, previous: ConnectionState }> {
        return this._connectionStatusChangeEvent.asObservable();
    }


    private createClient(): IAgoraRTCClient {

        const agoraClient = AgoraRTC.createClient({
            codec: this.config.Video ? this.config.Video?.codec : 'h264',
            mode: this.config.Video ? this.config.Video?.mode : 'rtc',
            role: this.config.Video ? this.config.Video?.role : 'audience'
        });
        this.remoteUsers = agoraClient.remoteUsers;

        agoraClient.on('user-published', async (user, mediaType) => {
            await this.client.subscribe(user, mediaType);
            this._userStateEvent.emit({ mediaType: mediaType, connectionState: 'CONNECTED', user: user });
        });

        agoraClient.on('user-unpublished', user => {
            this._userStateEvent.emit({ connectionState: 'DISCONNECTED', user: user });
        });

        agoraClient.on('connection-state-change', (current, previous) => {
            this._connectionStatusChangeEvent.emit({ current: current, previous: previous });
        });

        return agoraClient;
    }

    public createChannelClient(): IChannelClient {

        return {
            joinVideo: async (channel: string, token: string | null, uid?: string | number | null): Promise<IRemoteVideoTrack> => {

                await this.client.join(this.config.AppID, channel, token, uid);
                this.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
                await this.client.publish([this.localVideoTrack]);
                const localTrack: IRemoteVideoTrack = this.localVideoTrack;
                return new Promise((resolve, reject) => {
                    resolve(localTrack);
                    reject();
                });

            },
            joinVoice: async (channel: string, token: string | null, uid?: string | number | null): Promise<IRemoteAudioTrack> => {

                await this.client.join(this.config.AppID, channel, token, uid);
                this.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
                await this.client.publish([this.localAudioTrack]);
                const localTrack: IRemoteAudioTrack = this.localAudioTrack;
                return new Promise((resolve, reject) => {
                    resolve(localTrack);
                    reject();
                });

            },

            leaveVideo: (): Promise<any> => {
                
                this.localVideoTrack.stop();
                this.localVideoTrack.close();
                return this.client.leave();

            }
        };

    }

    public async leaveCall() {
        this.localAudioTrack.close();
        this.localVideoTrack.close();
        await this.client.leave();
    }

    public stopVideoCall() {
        this.localVideoTrack.stop();
        this.localVideoTrack.close();
    }

    public stopVoiceCall() {
        this.localAudioTrack.stop();
        this.localAudioTrack.close();
    }

    public async startVideoCall(channelName: string, token: string, uid?: number) {

        if (!this.localVideoPlayerElement) {
            console.error("LocalVideoPlayerElement can't be NULL. Call setLocalVideoPlayer(element: string | HTMLElement) method before startVideoCall() method.");
            return;
        }
        const localVideoTrack = await this.channel.joinVideo(channelName, token, uid);
        localVideoTrack.play(this.localVideoPlayerElement);

    }

    public setLocalVideoPlayer(element: string | HTMLElement) {
        this.localVideoPlayerElement = element;
    }

    public async startVoiceCall(channelName: string, token: string, uid?: number) {

        const localAudioTrack = await this.channel.joinVoice(channelName, token, uid);
        localAudioTrack.play();

    }

}
