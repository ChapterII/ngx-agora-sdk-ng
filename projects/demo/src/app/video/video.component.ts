import { Component, OnInit } from '@angular/core';
import { NgxAgoraSdkNgService } from 'ngx-agora-sdk-ng';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  title = 'demo-video';
  private token!: string;
  private channelName!: string;
  private localPlayer!: string;
  private remotePlayeList!: string;

  constructor(private agoraService: NgxAgoraSdkNgService) {

  }

  ngOnInit(): void {

    this.token = "agora-token";
    this.channelName = "1000";
    this.localPlayer = "local-player";
    this.remotePlayeList = 'remote-playerlist';

    this.agoraService.remoteUsersStatusChange().subscribe(state => {

      switch (state.connectionState) {

        case 'CONNECTED': {

          if (state.mediaType === "video") {
            const playerContainer: any = document.createElement("div");
            playerContainer.id = state.user.uid.toString();
            playerContainer.style.height = "200px";
            playerContainer.style.width = "200px";
            document.getElementById(this.remotePlayeList)?.append(playerContainer);
            state.user.videoTrack?.play(playerContainer, { fit: 'cover' });
          }
          else if (state.mediaType === "audio") {
            state.user.audioTrack?.play();
          }

          break;
        }
        case 'DISCONNECTED': {

          if (state.mediaType === "video") {
            this.agoraService.remoteUsers.forEach(user => {
              const playerContainer: any = document.getElementById(user.uid.toString());
              playerContainer.remove();
            });
          }

          break;
        }

      }

    });

  }

  public startVideoCall(): void {

    this.agoraService.setLocalVideoPlayer(this.localPlayer);
    this.agoraService.startVideoCall(this.channelName, this.token);

  }

  public stopVideoCall(): void {

    this.agoraService.stopVideoCall();
    document.getElementById(this.remotePlayeList)?.remove();

  }

}
