import {
    ClientRole, CODEC,
    IRemoteAudioTrack,
    IRemoteVideoTrack,
    MODE
} from './types';

export class AgoraConfig {
    AppID!: string;
    Video?: { codec: CODEC; mode: MODE; role: ClientRole; };
}
  
export interface IChannelClient {
    joinVideo(channel: string, token: string | null, uid?: string | number | null): Promise<IRemoteVideoTrack>;
    joinVoice(channel: string, token: string | null, uid?: string | number | null): Promise<IRemoteAudioTrack>;
    leaveVideo(): Promise<any>;
}