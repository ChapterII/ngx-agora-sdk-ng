import { EventEmitter, Inject, Injectable } from '@angular/core';
import AgoraRTC, {
    IAgoraRTCClient,
    ICameraVideoTrack,
    ILocalTrack,
    IMicrophoneAudioTrack
} from 'agora-rtc-sdk-ng';
import { Observable } from 'rxjs';
import { AgoraClient, AgoraConfig } from './agora-config';
import { IRemoteUser, UserState } from './types';

@Injectable({
    providedIn: 'root'
})
export class NgxAgoraSdkNgService {

    private localVideoPlayerElement!: string | HTMLElement;
    private localVideoTrack!: ICameraVideoTrack;
    private localAudioTrack!: IMicrophoneAudioTrack;
    private client!: IAgoraRTCClient;
    private _userStateEvent: EventEmitter<UserState> = new EventEmitter();
    public remoteUsers!: Array<IRemoteUser>;

    constructor(@Inject('config') private config: AgoraConfig) {

        if (!this.config) {
            console.error("AgoraConfig shoudn't be NULL. You have to condifure NgxAgoraSdkNgModule.forRoot({ AppId:'' })");
            return;
        }

        if (!this.checkSystemRequirements()) {
            this.logger('error', 'Web RTC is not supported');
        }

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

    public createClient(): AgoraClient {

        this.client = AgoraRTC.createClient({
            codec: this.config.Video ? this.config.Video?.codec : 'h264',
            mode: this.config.Video ? this.config.Video?.mode : 'rtc',
            role: this.config.Video ? this.config.Video?.role : 'audience'
        });
        this.remoteUsers = this.client.remoteUsers;

        this.client.on('user-published', async (user, mediaType) => {
            await this.client.subscribe(user, mediaType);
            this._userStateEvent.emit({ mediaType: mediaType, connectionState: 'CONNECTED', user: user });
        });

        this.client.on('user-unpublished', user => {
            this._userStateEvent.emit({ connectionState: 'DISCONNECTED', user: user });
        });

        return {
            join: (channel: string, token: string | null, uid?: string | number | null) => {
                return this.client.join(this.config.AppID, channel, token, uid);
            },
            publish: (tracks: ILocalTrack | ILocalTrack[]) => {
                return this.client.publish(tracks);
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

        const client = this.createClient();
        this.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
        await client.join(channelName, token, uid);
        await client.publish([this.localVideoTrack]);
        this.localVideoTrack.play(this.localVideoPlayerElement);

    }

    public setLocalVideoPlayer(element: string | HTMLElement) {
        this.localVideoPlayerElement = element;
    }

    public async startVoiceCall(channelName: string, token: string, uid?: number) {

        const client = this.createClient();
        this.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        await client.join(channelName, token, uid);
        await client.publish([this.localAudioTrack]);
        this.localAudioTrack.play();

    }

}
