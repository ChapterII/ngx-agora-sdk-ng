import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { IMediaTrack, IRemoteUser, NgxAgoraSdkNgService2 } from 'ngx-agora-sdk-ng';

import { MediaService } from '../../shared/services/media.service';
import { TokenService } from '../../shared/services/token.service';


export interface IMeetingUser {
  type: 'local' | 'remote';
  user: IRemoteUser;
}

@Component({
  selector: 'app-meeting-page',
  templateUrl: './meeting-page.component.html',
  styleUrls: ['./meeting-page.component.css']
})
export class MeetingPageComponent implements OnInit, OnDestroy {
  @ViewChild('localVideo', { static: true }) localVideo?: ElementRef;
  link = '';
  channel = '';
  subscriptions: Subscription[] = [];
  userList: IMeetingUser[] = [];
  audioInId = '';
  videoInId = '';
  audioOutId = '';
  token = '';
  mediaTrack?: IMediaTrack;

  constructor(
    private activatedRoute: ActivatedRoute,
    private agoraService: NgxAgoraSdkNgService2,
    private mediaService: MediaService,
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    forkJoin([
      this.activatedRoute.queryParams.pipe(take(1)),
      this.mediaService.selectedAudioInputId.pipe(take(1)),
      this.mediaService.selectedAudioOutputId.pipe(take(1)),
      this.mediaService.selectedVideoInputId.pipe(take(1)),
    ])
      .pipe(
        take(1),
      ).subscribe(([params, aInId, aOutId, vInId]) => {
        this.link = params.link;
        this.channel = params.channel;
        this.tokenService.getToken(this.channel);
        this.audioInId = aInId;
        this.videoInId = vInId;
        this.audioOutId = aOutId;
      });

    const tokenSub = this.tokenService.token.pipe(take(1)).subscribe(token => {
      this.token = token;
      this.joinVideo();
    });
    this.subscriptions.push(tokenSub);

    const remoteUserJoinSubs = this.agoraService.onRemoteUserJoined().subscribe(user => {
      this.userList.push({ type: 'remote', user });
    });
    this.subscriptions.push(remoteUserJoinSubs);

    const remoteUserLeaveSubs = this.agoraService.onRemoteUserLeft().subscribe(leftuser => {
      this.userList = this.userList.filter(user => user.user.uid !== leftuser.user.uid);
    });
    this.subscriptions.push(remoteUserLeaveSubs);

    const remoteUserChangeSubs = this.agoraService.onRemoteUsersStatusChange().subscribe(staus => {

      const currentUserIndex = this.userList.findIndex(user => user.user.uid === staus.user.uid);
      if (currentUserIndex >= 0) {
        this.userList[currentUserIndex] = { type: 'remote', user: staus.user };
      }
    });
    this.subscriptions.push(remoteUserChangeSubs);

    const localUserJoinedSubs = this.agoraService.onLocalUserJoined().subscribe( user => {
        this.userList.push({ type: 'local', user: user });
    });
    this.subscriptions.push(localUserJoinedSubs);
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  async joinVideo(): Promise<void> {
    this.mediaTrack =
      await this.agoraService.join(
        this.channel, // this.token)
        '006d11961e6059544868f50fa6c452ed26eIAC7nmgETV5xfFHC13zhbm/ObYDPs2Vz7m+NkoT7clWF9lKFcksAAAAAEACpE93I5fz7XwEAAQDl/Ptf'
      )
        .WithCameraAndMicrophone(this.audioInId, this.videoInId)
        .Apply();
  }

  onLocalMic(value: boolean): void {
    !value ? this.mediaTrack?.microphoneUnMute() : this.mediaTrack?.microphoneMute();
  }

  onLocalCamera(value: boolean): void {
    !value ? this.mediaTrack?.cameraOn() : this.mediaTrack?.cameraOff();
  }

  onLocalLeave(): void {
    this.agoraService.leave();
  }
}
