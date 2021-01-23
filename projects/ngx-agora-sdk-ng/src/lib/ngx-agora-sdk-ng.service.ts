import { EventEmitter, Inject, Injectable } from "@angular/core";
import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import { Observable } from "rxjs";
import { JoinAudioChannel, JoinChannel, JoinVideoChannel } from "./services/channel";
import { AgoraConfig } from "./agora-config";

import {
    IAudioTrack,
    INgxAgoraSdkNgService,
    IJoinChannel,
    IMediaTrack,
    IVideoTrack,
    IVideoJoinChannel,
    IAudioJoinChannel
} from "./core/interfaces";

import { IRemoteUser, NetworkQuality, UserState } from "./types";

@Injectable({
    providedIn: 'root'
})
export class NgxAgoraSdkNgService implements INgxAgoraSdkNgService {

    private agoraClient!: IAgoraRTCClient;

    constructor(@Inject('config') private config: AgoraConfig) {

        this.agoraClient = AgoraRTC.createClient({
            codec: config.Video ? config.Video?.codec : 'h264',
            mode: config.Video ? config.Video?.mode : 'rtc',
            role: config.Video ? config.Video?.role : 'audience'
        });

        this.agoraClient.on('user-published', async (user, mediaType) => {
            await this.agoraClient.subscribe(user, mediaType);

            this._onRemoteUserStateEvent.emit({
                mediaType: mediaType,
                connectionState: 'CONNECTED',
                user: {
                    uid: user.uid,
                    hasVideo: user.hasVideo,
                    hasAudio: user.hasAudio,
                    audioTrack: {
                        setVolume: (volume) => user.audioTrack?.setVolume(volume),
                        getVolumeLevel: () => <number>user.audioTrack?.getVolumeLevel(),
                        play: () => user.audioTrack?.play(),
                        getMediaStream: () => new MediaStream([<MediaStreamTrack>user.audioTrack?.getMediaStreamTrack()])
                    },
                    videoTrack: {
                        play: (element) => user.videoTrack?.play(element),
                        getMediaStream: () => new MediaStream([<MediaStreamTrack>user.videoTrack?.getMediaStreamTrack()])
                    }
                }
            });
        });

        this.agoraClient.on('user-unpublished', user => {
            this._onRemoteUserStateEvent.emit({
                connectionState: 'DISCONNECTED', user: {
                    uid: user.uid,
                    hasVideo: user.hasVideo,
                    hasAudio: user.hasAudio,
                    audioTrack: {
                        setVolume: (volume) => user.audioTrack?.setVolume(volume),
                        getVolumeLevel: () => <number>user.audioTrack?.getVolumeLevel(),
                        play: () => user.audioTrack?.play(),
                        getMediaStream: () => new MediaStream([<MediaStreamTrack>user.audioTrack?.getMediaStreamTrack()])
                    },
                    videoTrack: {
                        play: (element) => user.videoTrack?.play(element),
                        getMediaStream: () => new MediaStream([<MediaStreamTrack>user.videoTrack?.getMediaStreamTrack()])
                    }
                }
            });
        });

        this.agoraClient.on('user-joined', (user) => {
            this._onRemoteUserJoinedEvent.emit({
                uid: user.uid,
                hasVideo: user.hasVideo,
                hasAudio: user.hasAudio,
                audioTrack: {
                    setVolume: (volume) => user.audioTrack?.setVolume(volume),
                    getVolumeLevel: () => <number>user.audioTrack?.getVolumeLevel(),
                    play: () => user.audioTrack?.play(),
                    getMediaStream: () => new MediaStream([<MediaStreamTrack>user.audioTrack?.getMediaStreamTrack()])
                },
                videoTrack: {
                    play: (element) => user.videoTrack?.play(element),
                    getMediaStream: () => new MediaStream([<MediaStreamTrack>user.videoTrack?.getMediaStreamTrack()])
                }
            });
        });

        this.agoraClient.on('user-left', (user, reason) => {
            this._onRemoteUserLeftEvent.emit({
                user: {
                    uid: user.uid,
                    hasVideo: user.hasVideo,
                    hasAudio: user.hasAudio,
                    audioTrack: {
                        setVolume: (volume) => user.audioTrack?.setVolume(volume),
                        getVolumeLevel: () => <number>user.audioTrack?.getVolumeLevel(),
                        play: () => user.audioTrack?.play(),
                        getMediaStream: () => new MediaStream([<MediaStreamTrack>user.audioTrack?.getMediaStreamTrack()])
                    },
                    videoTrack: {
                        play: (element) => user.videoTrack?.play(element),
                        getMediaStream: () => new MediaStream([<MediaStreamTrack>user.videoTrack?.getMediaStreamTrack()])
                    }
                },
                reason: reason
            });
        });

        this.agoraClient.enableAudioVolumeIndicator();
        this.agoraClient.on('volume-indicator', (result) => {
            this._onRemoteVolumeIndicatorEvent.emit(result);
        });

        this.agoraClient.on('network-quality', (stats) => {
            this._onLocalNetworkQualityChangeEvent.emit({
                download: stats.downlinkNetworkQuality,
                upload: stats.uplinkNetworkQuality
            });
        })

    }

    public join(channelName: string, token: string, uid?: string): IJoinChannel<IMediaTrack> {
        let joinChannel = new JoinChannel(this.agoraClient, this.config, channelName, token, uid);
        joinChannel.registerUserJoinedEvent(this._onLocalUserJoinedEvent);
        return joinChannel;
    }

    public joinVideo(channelName: string, token: string, uid?: string): IVideoJoinChannel<IVideoTrack> {
        return new JoinVideoChannel(this.agoraClient, this.config, channelName, token, uid);
    }

    public joinAudio(channelName: string, token: string, uid?: string): IAudioJoinChannel<IAudioTrack> {
        return new JoinAudioChannel(this.agoraClient, this.config, channelName, token, uid);
    }

    // remark: review this code.
    public async leave(): Promise<any> {
        await this.agoraClient.leave();
        this._onLocalUserLeftEvent.emit();
    }

    public getCameras(): Promise<MediaDeviceInfo[]> {
        return AgoraRTC.getCameras();
    }

    public getMicrophones(): Promise<MediaDeviceInfo[]> {
        return AgoraRTC.getMicrophones();
    }

    public getDevices(): Promise<MediaDeviceInfo[]> {
        return AgoraRTC.getDevices();
    }

    public onRemoteUsersStatusChange(): Observable<UserState> {
        return this._onRemoteUserStateEvent.asObservable();
    }

    public onRemoteUserJoined(): Observable<IRemoteUser> {
        return this._onRemoteUserJoinedEvent.asObservable();
    }

    public onRemoteUserLeft(): Observable<{ user: IRemoteUser, reason: string }> {
        return this._onRemoteUserLeftEvent.asObservable();
    }

    public onRemoteVolumeIndicator(): Observable<Array<{ level: number, uid: number | string }>> {
        return this._onRemoteVolumeIndicatorEvent.asObservable();
    }


    public onLocalUserJoined(): Observable<{ track: IMediaTrack }> {
        return this._onLocalUserJoinedEvent.asObservable();
    }

    public onLocalUserLeft(): Observable<{ user: IRemoteUser, reason: string }> {
        return this._onLocalUserLeftEvent.asObservable();
    }

    public onLocalNetworkQualityChange(): Observable<any> {
        return this._onLocalNetworkQualityChangeEvent.asObservable();
    }

    private _onRemoteUserStateEvent: EventEmitter<UserState> = new EventEmitter();
    private _onRemoteUserJoinedEvent: EventEmitter<IRemoteUser> = new EventEmitter();
    private _onRemoteUserLeftEvent: EventEmitter<{ user: IRemoteUser, reason: string }> = new EventEmitter();
    private _onRemoteVolumeIndicatorEvent: EventEmitter<Array<{ level: number, uid: number | string }>> = new EventEmitter();
    private _onLocalUserJoinedEvent: EventEmitter<{ track: IMediaTrack }> = new EventEmitter();
    private _onLocalUserLeftEvent: EventEmitter<any> = new EventEmitter();
    private _onLocalNetworkQualityChangeEvent: EventEmitter<NetworkQuality> = new EventEmitter();

}  