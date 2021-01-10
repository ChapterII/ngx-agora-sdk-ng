import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faMicrophoneSlash, faMinusCircle, faThumbtack, faVideoSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-meeting-participant-controls',
  templateUrl: './meeting-participant-controls.component.html',
  styleUrls: ['./meeting-participant-controls.component.css']
})
export class MeetingParticipantControlsComponent implements OnInit {
  pinIcon = faThumbtack;
  kickIcon = faMinusCircle;
  micMuteIcon = faMicrophoneSlash;
  camMuteIcon = faVideoSlash;
  @Input() show = false;
  @Output() pin = new EventEmitter<void>();
  @Output() micMute = new EventEmitter<void>();
  @Output() camOff = new EventEmitter<void>();
  @Output() cick = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onPin(): void {
    this.pin.emit();
  }
  onMicMute(): void {
    this.micMute.emit();
  }
  onCamOff(): void {
    this.camOff.emit();
  }
  onCick(): void {
    this.cick.emit();
  }

}
