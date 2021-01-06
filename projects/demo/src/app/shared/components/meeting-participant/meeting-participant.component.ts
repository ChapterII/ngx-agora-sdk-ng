import { Component, Input, OnInit } from '@angular/core';

import { IRemoteVideoTrack } from 'ngx-agora-sdk-ng';

@Component({
  selector: 'app-meeting-participant',
  templateUrl: './meeting-participant.component.html',
  styleUrls: ['./meeting-participant.component.css']
})
export class MeetingParticipantComponent implements OnInit {
  @Input() videoTrack?: IRemoteVideoTrack;
  controlsVisible = false;
  constructor() { }

  ngOnInit(): void {
  }

  showControls(value: boolean) {
    this.controlsVisible = value;
  }

}
