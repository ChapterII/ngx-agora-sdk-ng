import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxAgoraSdkNgModule } from 'ngx-agora-sdk-ng';
import { VideoComponent } from './video/video.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
    NgxAgoraSdkNgModule.forRoot({
      // AppID: 'agora-appId',
      AppID: 'e325cc0c7a38494db6684b920bc704f3',
      Video: { codec: 'h264', mode: 'rtc', role: 'host' }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
