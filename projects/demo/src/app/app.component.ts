import { Component, OnInit } from '@angular/core';
import { NgxAgoraSdkNgService } from 'ngx-agora-sdk-ng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'demo';

  constructor(private agoraService: NgxAgoraSdkNgService) {

  }

  ngOnInit(): void {
    this.startVideoCall();
  }

  public startVideoCall(): void {

    let token = "agora-token";
    let channelName = "1000";
    this.agoraService.setLocalVideoPlayer("local-player");
    this.agoraService.startVideoCall(channelName, token);

  }

}
