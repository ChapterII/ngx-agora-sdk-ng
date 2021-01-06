import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meeting-preview',
  templateUrl: './meeting-preview.component.html',
  styleUrls: ['./meeting-preview.component.css']
})
export class MeetingPreviewComponent implements OnInit {
  showSettings = false;
  joinLoading = false;
  newLoading = false;
  connectionInfoForm?: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.connectionInfoForm = this.formBuilder.group({
      channel: '',
      token: '',
    });
   }

  onShowSettings() {
    this.showSettings = true;
  }

  onCloseSettings() {
    this.showSettings = false;
  }

  onJoinMeeting() {
    const {channel ,token} = this.connectionInfoForm?.value;
    this.router.navigate(['/meeting'], {queryParams: {channel, token}});
  }
}
