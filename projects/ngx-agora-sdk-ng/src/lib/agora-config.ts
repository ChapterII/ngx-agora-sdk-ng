import { ClientRole, CODEC, MODE } from './types';

export class AgoraConfig {
    AppID!: string;
    Video?: { codec: CODEC; mode: MODE; role: ClientRole; };
}