export declare type CODEC = "h264" | "vp8";
export declare type MODE = "live" | "rtc";
export declare type ClientRole = "audience" | "host";


export class IChannelConfig {
    token!: string;
    name!: string;
    uid?: number;
}
