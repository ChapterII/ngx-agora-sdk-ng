import { EventEmitter } from "@angular/core";
import AgoraRTC, { IAgoraRTCClient, ICameraVideoTrack, ILocalVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import { AgoraConfig } from "../agora-config";
import { IJoinChannel, IJoinChannelApply, IMediaTrack } from "../core/interfaces";
import { IRemoteUser } from "../types";
import { MediaTrack } from "./media-track";

export class JoinChannel implements IJoinChannel<IMediaTrack> {

    private mediaTrack!: [IMicrophoneAudioTrack, ICameraVideoTrack];
    private localVideoTrack !: ILocalVideoTrack;

    constructor(
        public client: IAgoraRTCClient,
        public config: AgoraConfig,
        public channelName: string,
        public token: string,
        public uid?: string,

    ) { }

    public async Apply(): Promise<IMediaTrack> {

        await this.client.join(this.config.AppID, this.channelName, this.token, this.uid);

        let localTrack: any;

        if (!this.localVideoTrack) {
            localTrack = await AgoraRTC.createMicrophoneAndCameraTracks();
        } else if (!this.mediaTrack) {
            localTrack = this.mediaTrack;
        }

        await this.client.publish(localTrack);

        let videTrack = new MediaTrack(localTrack);

        this._onLocalUserJoinedEvent.emit({
            uid: this.uid == null ? '0' : this.uid,
            audioTrack: localTrack[0],
            videoTrack: localTrack[1],
            hasAudio: true, hasVideo: true
        });

        return new Promise<IMediaTrack>((resolve, reject) => {
            resolve(videTrack);
            reject();
        });

    }

    public WithMediaStream(mediaStream: MediaStreamTrack): IJoinChannelApply<IMediaTrack> {
        this.localVideoTrack = AgoraRTC.createCustomVideoTrack({ mediaStreamTrack: mediaStream });
        return this;
    }

    public WithCameraAndMicrophone(microphoneId: string, cameraId: string): IJoinChannelApply<IMediaTrack> {

        (async () => {
            this.mediaTrack = await AgoraRTC.createMicrophoneAndCameraTracks(
                { microphoneId: microphoneId },
                { cameraId: cameraId }
            );
        });

        return this;
    }


    public registerUserJoinedEvent(event: EventEmitter<IRemoteUser>) {
        this._onLocalUserJoinedEvent = event;
    }

    private _onLocalUserJoinedEvent: EventEmitter<IRemoteUser> = new EventEmitter();

}
