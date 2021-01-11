export interface IJoinChannelApply<T> {
    Apply(): Promise<T>;
}

export interface IJoinChannel<T> extends IJoinChannelApply<T> {
    WithMediaStream(videoMediaStream: MediaStreamTrack, audioMediaStream: MediaStreamTrack): IJoinChannelApply<T>;
    WithCameraAndMicrophone(microphoneId: string, cameraId: string): IJoinChannelApply<T>;
}

export interface IAudioJoinChannel<T> extends IJoinChannelApply<T> {
    WithMediaStream(audioMediaStream: MediaStreamTrack): IJoinChannelApply<T>;
    WithMicrophone(microphoneId: string): IJoinChannelApply<T>;
}

export interface IVideoJoinChannel<T> extends IJoinChannelApply<T> {
    WithMediaStream(videoMediaStream: MediaStreamTrack): IJoinChannelApply<T>;
    WithCamera(cameraId: string): IJoinChannelApply<T>;
}