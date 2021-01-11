import { VideoPlayerConfig } from "../types";
import { ITrack } from './track';

export interface IVideoTrack extends ITrack {
    playVideo(element: string | HTMLElement, config?: VideoPlayerConfig): void;
    cameraOff(): void;
    cameraOn(): void;

}