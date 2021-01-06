import { VideoPlayerConfig } from "../types";

export interface IMediaTrack {
    playVideo(element: string | HTMLElement, config?: VideoPlayerConfig): void;
    microphoneMute(): void;
    microphoneUnMute(): void;
    cameraOff(): void;
    cameraOn(): void;
    setVolume(volume: number): void;
}