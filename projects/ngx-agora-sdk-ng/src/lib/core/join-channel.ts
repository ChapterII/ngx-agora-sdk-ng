export interface IJoinChannelApply<T> {
    Apply(): Promise<T>;
}

export interface IJoinChannel<T> extends IJoinChannelApply<T> {
    WithMediaStream(mediaStream: MediaStreamTrack): IJoinChannelApply<T>;
    WithCameraAndMicrophone(microphoneId: string, cameraId: string): IJoinChannelApply<T>;
}