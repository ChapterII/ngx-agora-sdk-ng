import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPhoneAlt, faVideo, faVideoSlash, faMicrophoneAlt, faMicrophoneAltSlash } from '@fortawesome/free-solid-svg-icons';
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
  hangUpIcon = faPhoneAlt;
  micIcon = faMicrophoneAlt;
  micOffIcon = faMicrophoneAltSlash
  camIcon = faVideo;
  camOffIcon = faVideoSlash;
  token = '';
  channel = '';
  type = '';
  subscriptions: Subscription[] = [];
  remoteVideoUserList: IRemoteUser[] = [];
  remoteAudioUserList: IRemoteUser[] = [];

  constructor(private activatedRoute: ActivatedRoute, private agoraService: AgoraService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params.token;
      this.channel = params.channel;
      this.type = params.type;
      this.joinVideo(this.type);
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

  ngOnDestroy() :void {
    for(const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  async joinVideo(type: string) {
    switch (type) {
      case 'new':
        try {
          this.agoraService.ngxAgoraService.setLocalVideoPlayer(this.localVideo?.nativeElement);
          await this.agoraService.ngxAgoraService.startVideoCall(this.channel, this.token);
        } catch (error) {
          console.error(error);
        }
        break;
      case 'join':
        try {
          this.agoraService.client = this.agoraService.ngxAgoraService.createChannelClient();
          const local = await this.agoraService.client.joinVideo(this.channel, this.token);
          local.play(this.localVideo?.nativeElement, {fit: 'cover'});
        } catch (error) {
          console.error(error);
        }
    }
  }
}
