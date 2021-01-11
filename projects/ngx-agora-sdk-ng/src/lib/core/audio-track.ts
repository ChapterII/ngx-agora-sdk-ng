import { ITrack } from './track';

export interface IAudioTrack extends ITrack {
    microphoneMute(): void;
    microphoneUnMute(): void;
    setVolume(volume: number): void;
}
