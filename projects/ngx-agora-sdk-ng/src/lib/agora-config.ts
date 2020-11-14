import { ClientRole, ILocalTrack } from 'agora-rtc-sdk-ng';
import { CODEC, MODE } from './types';

export class AgoraConfig {

    AppID!: string;
    Video!: { codec: CODEC; mode: MODE; role: ClientRole; };
}

export interface AgoraClient {
    join(channel: string, token: string | null, uid?: number | string | null): Promise<number | string>;
    publish(tracks: ILocalTrack | ILocalTrack[]): Promise<any>;
}