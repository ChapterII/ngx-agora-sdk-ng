import { ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import { IMediaTrack } from "../core/media-track";
import { VideoPlayerConfig } from "../types";

export class MediaTrack implements IMediaTrack {

    private _cameraVideoTrack!: ICameraVideoTrack;
    private _microphoneAudioTrack: IMicrophoneAudioTrack;

    constructor(private track: [IMicrophoneAudioTrack, ICameraVideoTrack]) {
         this._microphoneAudioTrack = this.track[0];
        this._cameraVideoTrack = this.track[1];
       
    }

    public stop(): void {
      this._cameraVideoTrack.stop();
      this._cameraVideoTrack.close();
      this._microphoneAudioTrack.stop();
      this._microphoneAudioTrack.close();
    }


    public playVideo(element: string | HTMLElement, config?: VideoPlayerConfig): void {
        this._cameraVideoTrack.play(element, config);
    }

    public microphoneMute(): void {
        this._microphoneAudioTrack.setEnabled(false);
    }

    public microphoneUnMute(): void {
        this._microphoneAudioTrack.setEnabled(true);
    }

    public cameraOff(): void {
        this._cameraVideoTrack.setEnabled(false);
    }

    public cameraOn(): void {
        this._cameraVideoTrack.setEnabled(true);
    }

    public setVolume(volume: number): void {
        this._microphoneAudioTrack.setVolume(volume);
    }

}