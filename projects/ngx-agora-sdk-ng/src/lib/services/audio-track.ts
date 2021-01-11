import { IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import { IAudioTrack } from "../core/audio-track";

export class AudioTrack implements IAudioTrack {

    private _microphoneAudioTrack: IMicrophoneAudioTrack;

    constructor(private microphoneAudioTrack: IMicrophoneAudioTrack) {
        this._microphoneAudioTrack = this.microphoneAudioTrack;
    }


    public stop(): void {
       this._microphoneAudioTrack.stop();
       this._microphoneAudioTrack.close();
    }

    public microphoneMute(): void {
        this._microphoneAudioTrack.setEnabled(false);
    }

    public microphoneUnMute(): void {
        this._microphoneAudioTrack.setEnabled(true);
    }

    public setVolume(volume: number): void {
        this._microphoneAudioTrack.setVolume(volume);
    }

}