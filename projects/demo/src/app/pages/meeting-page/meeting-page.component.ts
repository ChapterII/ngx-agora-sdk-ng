import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRemoteUser } from 'ngx-agora-sdk-ng';
import { Subscription } from 'rxjs';
import { AgoraService } from '../../shared/services/agora.service';

@Component({
  selector: 'app-meeting-page',
  templateUrl: './meeting-page.component.html',
  styleUrls: ['./meeting-page.component.css']
})
export class MeetingPageComponent implements OnInit, OnDestroy {
  @ViewChild('localVideo', { static: true }) localVideo?: ElementRef;
  token = '';
  channel = '';
  subscriptions: Subscription[] = [];
  remoteVideoUserList: IRemoteUser[] = [];
  remoteAudioUserList: IRemoteUser[] = [];

  constructor(private activatedRoute: ActivatedRoute, private agoraService: AgoraService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params.token;
      this.channel = params.channel;
      this.joinVideo();
    });

    const remoteUserStatChangeSubs = this.agoraService.ngxAgoraService.remoteUsersStatusChange().subscribe(state => {

      switch (state.connectionState) {
        case 'CONNECTED':

          if (state.mediaType === "video") {
            this.remoteVideoUserList.push(state.user);
          }
          else if (state.mediaType === "audio") {
            this.remoteAudioUserList.push(state.user);
          }

          break;
        case 'DISCONNECTED':
          if (state.mediaType === "video") {
            this.remoteVideoUserList = this.remoteVideoUserList.filter(user => user.uid !== state.user.uid);
          }
          else if (state.mediaType === "audio") {
            this.remoteAudioUserList = this.remoteAudioUserList.filter(user => user.uid !== state.user.uid);
          }

          break;

      }

    });

    this.subscriptions.push(remoteUserStatChangeSubs);
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  async joinVideo() {
    try {
      this.agoraService.ngxAgoraService.setLocalVideoPlayer(this.localVideo?.nativeElement);
      await this.agoraService.ngxAgoraService.startVideoCall(this.channel, this.token);
    } catch (error) {
      console.error(error);
    }
  }
}
