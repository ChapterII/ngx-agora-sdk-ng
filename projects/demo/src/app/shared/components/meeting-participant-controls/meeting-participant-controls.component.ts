import { Component, OnInit, Input } from '@angular/core';
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
  constructor() { }

  ngOnInit(): void {
  }

}
