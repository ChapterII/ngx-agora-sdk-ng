import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
import { IMediaTrack, IRemoteAudioTrack, IRemoteVideoTrack } from 'ngx-agora-sdk-ng';

import { IMeetingUser } from '../../../pages/meeting-page/meeting-page.component';

@Component({
  selector: 'app-meeting-participant',
  templateUrl: './meeting-participant.component.html',
  styleUrls: ['./meeting-participant.component.css']
})
export class MeetingParticipantComponent implements OnInit {
  @Output() pinned = new EventEmitter<IMeetingUser>();
  micMuteIcon = faMicrophoneSlash;
  myUser: any;

  @Input() set user(value: IMeetingUser) {
    this.myUser = value;
    if (value.type === 'remote') {
      this.videoTrack = value.user?.videoTrack;
      this.audioTrack = value.user?.audioTrack;
      this.micStatus = !!value.user?.hasAudio;
      this.camStatus = !!value.user?.hasVideo;
      this.audioStream = value.user?.audioTrack?.getMediaStream();
    }
    else {
      this.mediaTrack = value.mediaTrack;
      // this.audioStream = this.mediaTrack?.getAudioMediaStream();
    }
  }

  mediaTrack?: IMediaTrack;
  audioTrack?: IRemoteAudioTrack;
  videoTrack?: IRemoteVideoTrack;
  audioStream?: MediaStream;
  controlsVisible = false;
  micStatus = false;
  camStatus = false;

  constructor() { }

  ngOnInit(): void {
  }

  showControls(value: boolean): void {
      this.controlsVisible = value;
  }

  isRemote(): boolean {
    return this.myUser?.type === 'remote';
  }

  onCamOff(): void {
    this.camStatus = !this.camStatus;
    this.camStatus ? this.mediaTrack?.cameraOn() : this.mediaTrack?.cameraOff();
  }
  onMicMute(): void {
    this.micStatus = !this.micStatus;
    this.micStatus ? this.mediaTrack?.microphoneUnMute() : this.mediaTrack?.microphoneMute();
  }
  onPin(): void {
    this.pinned.emit(this.myUser);
  }

}
