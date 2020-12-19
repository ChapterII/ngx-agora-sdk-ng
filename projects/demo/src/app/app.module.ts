import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgxAgoraSdkNgModule } from 'ngx-agora-sdk-ng';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { VideoComponent } from './video/video.component';
import { MeetingPreviewComponent } from './pages/meeting-preview/meeting-preview.component';
import { RoundTranparentIconButtonComponent } from './shared/components/round-tranparent-icon-button/round-tranparent-icon-button.component';
import { InputOutputSettingsComponent } from './shared/components/input-output-settings/input-output-settings.component';
import { SoundMeterComponent } from './shared/components/sound-meter/sound-meter.component';
import { CameraPreviewComponent } from './shared/components/camera-preview/camera-preview.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'preview', pathMatch: 'full' },
  { path: 'preview', component: MeetingPreviewComponent },
  { path: 'sample', component: VideoComponent },
]


@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    MeetingPreviewComponent,
    RoundTranparentIconButtonComponent,
    InputOutputSettingsComponent,
    SoundMeterComponent,
    CameraPreviewComponent
  ],
  imports: [
    BrowserModule,
    NgxAgoraSdkNgModule.forRoot({
      AppID: 'replace-agora-appId',
      Video: { codec: 'h264', mode: 'rtc', role: 'host' }
    }),
    FontAwesomeModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
