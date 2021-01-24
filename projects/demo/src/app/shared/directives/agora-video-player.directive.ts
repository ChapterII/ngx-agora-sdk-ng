import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { IMediaTrack, IRemoteAudioTrack, IRemoteVideoTrack } from 'ngx-agora-sdk-ng';

export interface IAgoraVideoPlayerTrackOption {
  mediaTrack?: IMediaTrack;
  audioTrack?: IRemoteAudioTrack;
  videoTrack?: IRemoteVideoTrack;
}

@Directive({
  selector: '[appAgoraVideoPlayer]'
})
export class AgoraVideoPlayerDirective implements OnInit {
  @Input('appAgoraVideoPlayer') set trackOption(options: IAgoraVideoPlayerTrackOption) {
    this.playTrack(options);
  }
  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void { }

  private playTrack(tracks: IAgoraVideoPlayerTrackOption): void {
    while (this.elementRef.nativeElement.firstChild) {
      this.elementRef.nativeElement.removeChild(this.elementRef.nativeElement.firstChild);
    }
    if (tracks.mediaTrack) {
      tracks.mediaTrack.playVideo(this.elementRef.nativeElement, { fit: 'cover' });
      return;
    }
    if (tracks.audioTrack) {
      tracks.audioTrack.play();
    }

    if (tracks.videoTrack) {
      tracks.videoTrack.play(this.elementRef.nativeElement, { fit: 'cover' });
    }
  }
}
