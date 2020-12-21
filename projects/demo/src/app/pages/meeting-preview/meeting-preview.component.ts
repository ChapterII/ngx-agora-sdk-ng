import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meeting-preview',
  templateUrl: './meeting-preview.component.html',
  styleUrls: ['./meeting-preview.component.css']
})
export class MeetingPreviewComponent implements OnInit {
  showSettings = false;

  constructor() { }

  ngOnInit(): void { }

  onShowSettings() {
    this.showSettings = true;
  }

  onCloseSettings() {
    this.showSettings = false;
  }
}
