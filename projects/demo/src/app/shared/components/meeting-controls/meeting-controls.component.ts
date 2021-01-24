import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { faPhoneAlt, faVideo, faVideoSlash, faMicrophoneAlt, faMicrophoneAltSlash, faThumbtack } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-meeting-controls',
  templateUrl: './meeting-controls.component.html',
  styleUrls: ['./meeting-controls.component.css']
})
export class MeetingControlsComponent implements OnInit {
  hangUpIcon = faPhoneAlt;
  micIcon = faMicrophoneAlt;
  micOffIcon = faMicrophoneAltSlash;
  camIcon = faVideo;
  camOffIcon = faVideoSlash;
  pinIcon = faThumbtack;
  @Output() micMuted = new EventEmitter<boolean>();
  @Output() cameraMuted = new EventEmitter<boolean>();
  @Output() hangedUp = new EventEmitter();
  @Output() pinned = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onMicMute(value: boolean) {
    this.micMuted.emit(value);
  }

  onCameraMute(value: boolean) {
    this.cameraMuted.emit(value);
  }

  onHangUp() {
    this.hangedUp.emit();
  }

  onPin(value: boolean) {
    this.pinned.emit(value);
  }

}
