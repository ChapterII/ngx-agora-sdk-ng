import { EventEmitter } from "@angular/core";
import AgoraRTC, { IAgoraRTCClient, ICameraVideoTrack, ILocalAudioTrack, ILocalVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import { AgoraConfig } from "../agora-config";
import { IJoinChannel, IJoinChannelApply, IMediaTrack } from "../core/interfaces";
import { IRemoteUser } from "../types";
import { MediaTrack } from "./media-track";

export class JoinChannel implements IJoinChannel<IMediaTrack> {

    private localVideoTrack!: ILocalVideoTrack;
    private requestInWait!: Promise<[IMicrophoneAudioTrack, ICameraVideoTrack]>;
    private tracks: Array<any> = new Array<any>();

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

        if (this.requestInWait) { localTrack = await this.requestInWait; }
        else if (this.tracks.length > 0) { localTrack = this.tracks; }
        else { localTrack = await AgoraRTC.createMicrophoneAndCameraTracks(); }

        await this.client.publish(localTrack);

        let mediaTrack = new MediaTrack(localTrack);

        this._onLocalUserJoinedEvent.emit({ track: mediaTrack });

        return new Promise<IMediaTrack>((resolve, reject) => {
            resolve(mediaTrack);
            reject();
        });

    }


    public WithMediaStream(videoMediaStream: MediaStreamTrack, audioMediaStream: MediaStreamTrack): IJoinChannelApply<IMediaTrack> {
        this.tracks.push(AgoraRTC.createCustomAudioTrack({ mediaStreamTrack: audioMediaStream }));
        this.tracks.push(AgoraRTC.createCustomVideoTrack({ mediaStreamTrack: videoMediaStream }));
        return this;
    }


    public WithCameraAndMicrophone(microphoneId: string, cameraId: string): IJoinChannelApply<IMediaTrack> {

        this.requestInWait = AgoraRTC.createMicrophoneAndCameraTracks(
            { microphoneId: microphoneId },
            { cameraId: cameraId }
        );


        return this;
    }


    public registerUserJoinedEvent(event: EventEmitter<{ track: IMediaTrack }>) {
        this._onLocalUserJoinedEvent = event;
    }

    private _onLocalUserJoinedEvent: EventEmitter<{ track: IMediaTrack }> = new EventEmitter();

}
