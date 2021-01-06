import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { IRemoteVideoTrack } from 'ngx-agora-sdk-ng';

@Directive({
  selector: '[appAgoraVideoPlayer]'
})
export class AgoraVideoPlayerDirective implements OnInit, OnDestroy{
  @Input('appAgoraVideoPlayer') track?: IRemoteVideoTrack;
  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.track?.play(this.elementRef.nativeElement, {fit: 'cover'});
  }

  ngOnDestroy(): void {
    
  }

}
