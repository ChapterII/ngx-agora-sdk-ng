import { ICameraVideoTrack } from "agora-rtc-sdk-ng";
import { IVideoTrack } from "../core/video-track";
import { VideoPlayerConfig } from "../types";

export class VideoTrack implements IVideoTrack {

    private _cameraVideoTrack: ICameraVideoTrack;

    constructor(private cameraVideoTrack: ICameraVideoTrack) {
        this._cameraVideoTrack = this.cameraVideoTrack;
    }

   
    public stop(): void {
       this._cameraVideoTrack.stop();
       this._cameraVideoTrack.close();
    }

    public playVideo(element: string | HTMLElement, config?: VideoPlayerConfig): void {
        this._cameraVideoTrack.play(element, config);
    }

    public cameraOff(): void {
        this._cameraVideoTrack.setEnabled(false);
    }

    public cameraOn(): void {
        this._cameraVideoTrack.setEnabled(true);
    }

}