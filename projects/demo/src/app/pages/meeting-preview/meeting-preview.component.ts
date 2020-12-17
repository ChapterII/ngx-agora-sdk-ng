import { Component, OnInit } from '@angular/core';
import {faMicrophoneAlt , faMicrophoneAltSlash, faVideo, faVideoSlash } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-meeting-preview',
  templateUrl: './meeting-preview.component.html',
  styleUrls: ['./meeting-preview.component.css']
})
export class MeetingPreviewComponent implements OnInit {
  micIcon = faMicrophoneAlt;
  micMutedIcon = faMicrophoneAltSlash;
  camIcon = faVideo;
  camOffIcon = faVideoSlash;
  showCamera = true;

  constructor() { }

  ngOnInit(): void {
  }

  onCameraChange(state: boolean) {
    this.showCamera = !state;
  }

}
