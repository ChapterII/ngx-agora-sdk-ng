export declare type CODEC = "h264" | "vp8";
export declare type MODE = "live" | "rtc";
export declare type ClientRole = "audience" | "host";
export declare type MediaType = "video" | "audio";
export declare type ConnectionState = "DISCONNECTED" | "CONNECTED";


export class UserState {
    public connectionState!: ConnectionState;
    public mediaType?: MediaType;
    public user!: IRemoteUser
}

export declare interface IRemoteUser {

    uid: number | string;
    audioTrack?: IRemoteAudioTrack;
    videoTrack?: IRemoteVideoTrack;
    hasAudio: boolean;
    hasVideo: boolean;
}

export declare interface IRemoteVideoTrack {
    play(element: string | HTMLElement, config?: VideoPlayerConfig): void;
}

export declare interface IRemoteAudioTrack {
    play(): void;
    setVolume(volume: number): void;
    getVolumeLevel(): number;
}


export declare interface VideoPlayerConfig {
    mirror?: boolean;
    fit?: "cover" | "contain" | "fill";
}


export class IChannelConfig {
    token!: string;
    name!: string;
    uid?: number;
}
