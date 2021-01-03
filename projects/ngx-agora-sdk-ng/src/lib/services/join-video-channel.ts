import AgoraRTC, { IAgoraRTCClient, ICameraVideoTrack, ILocalVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import { AgoraConfig } from "../agora-config";
import { IVideoTrack, IJoinChannel, IJoinChannelApply } from "../core/interfaces";
import { VideoTrack } from "./video-track";

export class JoinVideoChannel implements IJoinChannel<IVideoTrack>{

    private mediaTrack!: IMicrophoneAudioTrack;
    private localVideoTrack !: ILocalVideoTrack;

    constructor(
        public client: IAgoraRTCClient,
        public config: AgoraConfig,
        public channelName: string,
        public token: string,
        public uid?: string
    ) { }

    public WithMediaStream(mediaStream: MediaStreamTrack): IJoinChannelApply<IVideoTrack> {
        this.localVideoTrack = AgoraRTC.createCustomVideoTrack({ mediaStreamTrack: mediaStream });
        return this;
    }

    public WithCameraAndMicrophone(microphoneId: string, cameraId: string): IJoinChannelApply<IVideoTrack> {

        (async () => {
            this.mediaTrack = await AgoraRTC.createMicrophoneAudioTrack(
                { microphoneId: microphoneId }
            );
        });

        return this;

    }

    public async Apply(): Promise<IVideoTrack> {

        await this.client.join(this.config.AppID, this.channelName, this.token, this.uid);

        let localTrack: any;

        if (!this.localVideoTrack) {
            localTrack = await AgoraRTC.createCameraVideoTrack();
        } else if (!this.mediaTrack) {
            localTrack = this.mediaTrack;
        }

        await this.client.publish([localTrack]);

        let videTrack = new VideoTrack(<ICameraVideoTrack>localTrack);

        return new Promise<IVideoTrack>((resolve, reject) => {
            resolve(videTrack);
            reject();
        });

    }

}