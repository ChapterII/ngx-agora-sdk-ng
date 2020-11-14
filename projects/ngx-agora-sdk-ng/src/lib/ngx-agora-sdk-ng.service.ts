import { Inject, Injectable } from '@angular/core';

import AgoraRTC, {
    IAgoraRTCClient,
    ICameraVideoTrack,
    ILocalTrack,
    IMicrophoneAudioTrack
} from 'agora-rtc-sdk-ng';
import { AgoraClient, AgoraConfig } from './agora-config';



@Injectable({
    providedIn: 'root'
})
export class NgxAgoraSdkNgService {

    private localPlayerElement!: string | HTMLElement;
    private localVideoTrack!: ICameraVideoTrack;
    private localAudioTrack!: IMicrophoneAudioTrack;
    private client!: IAgoraRTCClient;

    constructor(@Inject('config') private config: AgoraConfig) {

        if (!config || this.isEmpty(config)) {
            console.log("Config shoudn't be NULL.");
            return;
        }

        if (!this.checkSystemRequirements()) {
            this.logger('error', 'Web RTC is not supported');
        }

    }


    private isEmpty(obj: any): boolean {
        for (var key in obj) {
            if (this.hasOwnProperty(key))
                return false;
        }
        return true;
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

    public createClient(): AgoraClient {

        this.client = AgoraRTC.createClient({
            codec: this.config.Video.codec,
            mode: this.config.Video.mode,
            role: this.config.Video.role
        });

        
        this.client.on('user-published', async (user, mediaType) => {

            await this.client.subscribe(user, mediaType);

            if (mediaType === "video") {

                const playerContainer = document.createElement("div");
                playerContainer.id = user.uid.toString();
                playerContainer.className = "col-md-6 form-group";
                playerContainer.style.height = "300px";
                // document.getElementById('video-playerlist').append(playerContainer);
                // user.videoTrack.play(playerContainer);
            }
            else if (mediaType === "audio") {
                // user.audioTrack.play();
            }

        });

        this.client.on('user-unpublished', user => {
            // const playerContainer = document.getElementById(user.uid.toString());
            // playerContainer.remove();
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


    public setLocalPlayer(element: string | HTMLElement) {
        this.localPlayerElement = element;
    }

    public async startVideoAndVoiceCall(channelName: string, token: string, uid?: number) {

        const client = this.createClient();
        this.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
        this.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        await client.join(channelName, token, uid);
        await client.publish([this.localVideoTrack, this.localAudioTrack]);

        const _playerContainer = document.createElement("div");
        //_playerContainer.id = uid.toString();
        _playerContainer.className = "col-md-6 form-group";
        _playerContainer.style.height = "300px";
        // document.getElementById('video-playerlist').append(_playerContainer);

        this.localVideoTrack.play(_playerContainer, { fit: 'cover' });

    }


    public async leaveCall() {

        this.localAudioTrack.close();
        this.localVideoTrack.close();

        this.client.remoteUsers.forEach(user => {
            const playerContainer = document.getElementById(user.uid.toString());
            playerContainer && playerContainer.remove();
        });
        await this.client.leave();
    }


    public async stopVideoAndVoiceCall() {
        
        this.stopViceoCall();
        this.stopVoiceCall();

        this.client.remoteUsers.forEach(user => {
            const playerContainer = document.getElementById(user.uid.toString());
            playerContainer && playerContainer.remove();
        });
        await this.client.leave();

    }

    public stopViceoCall() {
        this.localVideoTrack.stop();
        this.localVideoTrack.close();
        // this.localVideoTrack = null;
    }

    public stopVoiceCall() {
        this.localAudioTrack.stop();
        this.localAudioTrack.close();
        // this.localAudioTrack = null;
    }

    public async startVideoCall(channelName: string, token: string, uid?: number) {

        const client = this.createClient();
        this.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
        await client.join(channelName, token, uid);
        await client.publish([this.localVideoTrack]);
        this.localVideoTrack.play(this.localPlayerElement);

    }


    public async startVoiceCall(channelName: string, token: string, uid?: number) {

        const client = this.createClient();
        this.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        await client.join(channelName, token, uid);
        await client.publish([this.localAudioTrack]);
        this.localAudioTrack.play();

    }






}
