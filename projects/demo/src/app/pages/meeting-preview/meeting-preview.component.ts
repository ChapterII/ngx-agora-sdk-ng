import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenService } from '../../shared/services/token.service';

@Component({
  selector: 'app-meeting-preview',
  templateUrl: './meeting-preview.component.html',
  styleUrls: ['./meeting-preview.component.css']
})
export class MeetingPreviewComponent implements OnInit, OnDestroy {
  showSettings = false;
  joinLoading = false;
  newLoading = false;
  connectionInfoForm?: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tokeService: TokenService
  ) { }

  ngOnInit(): void {
    this.connectionInfoForm = this.formBuilder.group({
      channel: '',
      link: '',
    });

    const channelChangeSubs = this.connectionInfoForm.get('channel')?.valueChanges.subscribe(value => {
      if (value === '') {
        this.connectionInfoForm?.get('link')?.enable({ emitEvent: false });
      }
      else {
        this.connectionInfoForm?.get('link')?.disable({ emitEvent: false });
      }
    });

    this.subscriptions.push(channelChangeSubs as Subscription);

    const linkChangeSubs = this.connectionInfoForm.get('link')?.valueChanges.subscribe(value => {
      if (value === '') {
        this.connectionInfoForm?.get('channel')?.enable({ emitEvent: false });
      }
      else {
        this.connectionInfoForm?.get('channel')?.disable({ emitEvent: false });
      }
    });
    this.subscriptions.push(linkChangeSubs as Subscription);
  }

  ngOnDestroy(): void {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }

  onShowSettings(): void {
    this.showSettings = true;
  }

  onCloseSettings(): void {
    this.showSettings = false;
  }

  onJoinMeeting(): void {
    const { channel, link } = this.connectionInfoForm?.value;
    if (channel) {
      const joinLink = this.tokeService.getLink(channel);
      alert(`You can Invite other people using the link: ${joinLink}`);
    }
    this.router.navigate(['/meeting'], { queryParams: { channel, link } });
  }
}
