export interface IAudioTrack {
    microphoneMute(): void;
    microphoneUnMute(): void;
    setVolume(volume: number): void;
}
