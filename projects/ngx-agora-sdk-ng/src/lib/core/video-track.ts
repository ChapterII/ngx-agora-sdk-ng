import { VideoPlayerConfig } from "../types";

export interface IVideoTrack {
    play(element: string | HTMLElement, config?: VideoPlayerConfig): void;
    cameraOff(): void;
    cameraOn(): void;
}