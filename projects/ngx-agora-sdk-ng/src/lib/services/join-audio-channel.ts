import AgoraRTC, { IAgoraRTCClient, ICameraVideoTrack, ILocalAudioTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import { AgoraConfig } from "../agora-config";
import { IJoinChannel, IJoinChannelApply, IAudioTrack, IAudioJoinChannel } from "../core/interfaces";
import { AudioTrack } from "./audio-track";

export class JoinAudioChannel implements IAudioJoinChannel<IAudioTrack>{

    private localAudioTrack !: ILocalAudioTrack;
    private requestInWait!: Promise<IMicrophoneAudioTrack>;

    constructor(
        public client: IAgoraRTCClient,
        public config: AgoraConfig,
        public channelName: string,
        public token: string,
        public uid?: string
    ) { }

    public WithMediaStream(audioMediaStream: MediaStreamTrack): IJoinChannelApply<IAudioTrack> {
        this.localAudioTrack = AgoraRTC.createCustomAudioTrack({ mediaStreamTrack: audioMediaStream });
        return this;
    }

    public WithMicrophone(microphoneId: string): IJoinChannelApply<IAudioTrack> {
        this.requestInWait = AgoraRTC.createMicrophoneAudioTrack({ microphoneId: microphoneId });
        return this;
    }

    public async Apply(): Promise<IAudioTrack> {

        await this.client.join(this.config.AppID, this.channelName, this.token, this.uid);

        let localTrack: any;

        if (this.requestInWait) { localTrack = await this.requestInWait; }
        else if (this.localAudioTrack) { localTrack = this.localAudioTrack; }
        else { localTrack = await AgoraRTC.createMicrophoneAudioTrack(); }

        await this.client.publish([localTrack]);

        let audioTrack = new AudioTrack(localTrack);

        return new Promise<IAudioTrack>((resolve, reject) => {
            resolve(audioTrack);
            reject();
        });

    }

}
