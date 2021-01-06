import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxAgoraSdkNgModule } from 'ngx-agora-sdk-ng';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { VideoComponent } from './pages/video/video.component';
import { MeetingPreviewComponent } from './pages/meeting-preview/meeting-preview.component';
import { RoundTranparentIconButtonComponent } from './shared/components/round-tranparent-icon-button/round-tranparent-icon-button.component';
import { InputOutputSettingsComponent } from './shared/components/input-output-settings/input-output-settings.component';
import { SoundMeterComponent } from './shared/components/sound-meter/sound-meter.component';
import { CameraPreviewComponent } from './shared/components/camera-preview/camera-preview.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { MeetingPageComponent } from './pages/meeting-page/meeting-page.component';
import { AgoraVideoPlayerDirective } from './shared/directives/agora-video-player.directive';
import { MeetingControlsComponent } from './shared/components/meeting-controls/meeting-controls.component';
import { MeetingParticipantComponent } from './shared/components/meeting-participant/meeting-participant.component';
import { MeetingParticipantControlsComponent } from './shared/components/meeting-participant-controls/meeting-participant-controls.component';


@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    MeetingPreviewComponent,
    RoundTranparentIconButtonComponent,
    InputOutputSettingsComponent,
    SoundMeterComponent,
    CameraPreviewComponent,
    WelcomeComponent,
    MeetingPageComponent,
    AgoraVideoPlayerDirective,
    MeetingControlsComponent,
    MeetingParticipantComponent,
    MeetingParticipantControlsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgxAgoraSdkNgModule.forRoot({
      AppID: 'd11961e6059544868f50fa6c452ed26e',
      Video: { codec: 'h264', mode: 'rtc', role: 'host' }
    }),
    FontAwesomeModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
