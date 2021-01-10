import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { IMediaTrack, IRemoteAudioTrack, IRemoteVideoTrack } from 'ngx-agora-sdk-ng';

@Directive({
  selector: '[appAgoraVideoPlayer]'
})
export class AgoraVideoPlayerDirective implements OnDestroy, OnInit, OnChanges{
  @Input('appAgoraVideoPlayer') track?: IMediaTrack;
  @Input() audioTrack?: IRemoteAudioTrack;
  @Input() videoTrack?: IRemoteVideoTrack;
  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.playTrack();
  }
  ngOnChanges(): void {
    this.playTrack();
  }

  playTrack(): void {
    if ( this.track ) {
      this.track.playVideo(this.elementRef.nativeElement, {fit: 'cover'});
      return;
    }
    if (this. audioTrack) {
      this.audioTrack.play();
    }

    if (this.videoTrack) {
      this.videoTrack.play(this.elementRef.nativeElement, {fit: 'cover'});
    }
  }

  ngOnDestroy(): void { }

}
