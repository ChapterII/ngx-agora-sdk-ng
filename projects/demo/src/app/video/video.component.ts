import { Component, OnInit } from '@angular/core';
import { NgxAgoraSdkNgService, IChannelClient } from 'ngx-agora-sdk-ng';

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
  private client!: IChannelClient;


  constructor(private agoraService: NgxAgoraSdkNgService) {

  }

  ngOnInit(): void {

    this.token = "replace-agora-token";
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

    this.agoraService.connectionStatusChange().subscribe((status) => {

      switch (status.current) {
        case 'DISCONNECTED': {
          const playerContainer: any = document.getElementById(this.localPlayer);
          playerContainer.remove();
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

  public joinVideoChannel(): void {

    this.client = this.agoraService.createChannelClient();
    this.client.joinVideo(this.channelName, this.token).then(local => {
      local.play(this.localPlayer);
    });

  }


  public joinVoiceChannel(): void {

    this.client = this.agoraService.createChannelClient();
    this.client.joinVoice(this.channelName, this.token).then(local => {
      local.setVolume(50);
    });

  }


  public leaveVideoChannel(): void {

    this.client.leaveVideo();

  }

}
