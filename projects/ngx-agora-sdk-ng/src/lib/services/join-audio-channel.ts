import AgoraRTC, { IAgoraRTCClient, ICameraVideoTrack, ILocalAudioTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import { AgoraConfig } from "../agora-config";
import { IJoinChannel, IJoinChannelApply, IAudioTrack } from "../core/interfaces";
import { AudioTrack } from "./audio-track";

export class JoinAudioChannel implements IJoinChannel<IAudioTrack>{

    private mediaTrack!: [IMicrophoneAudioTrack, ICameraVideoTrack];
    private localAudioTrack !: ILocalAudioTrack;

    constructor(
        public client: IAgoraRTCClient,
        public config: AgoraConfig,
        public channelName: string,
        public token: string,
        public uid?: string
    ) { }

    public WithMediaStream(mediaStream: MediaStreamTrack): IJoinChannelApply<IAudioTrack> {
        this.localAudioTrack = AgoraRTC.createCustomAudioTrack({ mediaStreamTrack: mediaStream });
        return this;
    }

    public WithCameraAndMicrophone(microphoneId: string, cameraId: string): IJoinChannelApply<IAudioTrack> {

        (async () => {
            this.mediaTrack = await AgoraRTC.createMicrophoneAndCameraTracks(
                { microphoneId: microphoneId },
                { cameraId: cameraId }
            );
        });

        return this;
    }

    public async Apply(): Promise<IAudioTrack> {

        await this.client.join(this.config.AppID, this.channelName, this.token, this.uid);

        let localTrack: any;

        if (!this.localAudioTrack) {
            localTrack = await AgoraRTC.createMicrophoneAudioTrack();
        } else if (!this.mediaTrack) {
            localTrack = this.mediaTrack;
        }

        await this.client.publish([localTrack]);

        let audioTrack = new AudioTrack(<IMicrophoneAudioTrack>localTrack);

        return new Promise<IAudioTrack>((resolve, reject) => {
            resolve(audioTrack);
            reject();
        });

    }

}
