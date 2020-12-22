import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { faVideo, faPhoneVolume, faMicrophoneAlt, faVolumeUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { MediaService, MediaStreamType } from '../../services/media.service';

export enum TabKind {
  audio,
  video,
}

@Component({
  selector: 'app-input-output-settings',
  templateUrl: './input-output-settings.component.html',
  styleUrls: ['./input-output-settings.component.css']
})
export class InputOutputSettingsComponent implements OnInit, OnDestroy {
  @ViewChild('videoSample') videoSample!: ElementRef;
  @Output() closed = new EventEmitter();
  subscriptions: Subscription[] = [];
  tabKind = TabKind;
  audioIcon = faPhoneVolume;
  videoIcon = faVideo;
  micIcon = faMicrophoneAlt;
  speakerIcon = faVolumeUp;
  closeIcon = faTimes;
  selectedTab: TabKind = TabKind.audio;
  micDevicesInfos: MediaDeviceInfo[] = [];
  speakerDevicesInfos: MediaDeviceInfo[] = [];
  camDevicesInfos: MediaDeviceInfo[] = [];
  testAudio = new Audio();
  stream?: MediaStream;
  selectedVideoId!: string;
  selectedAudioOutId!: string;
  selectedAudioInId!: string;

  constructor(private mediaService: MediaService) { 
    this.testAudio.src = 'assets/audio/piano-test.mp3';
  }

  ngOnInit(): void {
    this.getDeviceInfos().then(() => {
      const videoInSubs = this.mediaService.selectedVideoInputId.subscribe(id => {
        this.selectedVideoId = id;
        if (id && this.selectedTab === TabKind.video) {
          this.getVideo(id);
        }
        if (!id) {
          if (this.camDevicesInfos.length > 0) {
            this.mediaService.videoInputId = this.camDevicesInfos[0].deviceId;
          }
        }
      });
      this.subscriptions.push(videoInSubs);
  
      const audioOutSubs = this.mediaService.selectedAudioOutputId.subscribe(id => {
        this.selectedAudioOutId = id;
        if( id && this.selectedTab === TabKind.audio) {
          this.mediaService.setSinkID(this.testAudio, id);
        }
        if (!id) {
          if (this.speakerDevicesInfos.length > 0) {
            this.mediaService.audioOutputId = this.speakerDevicesInfos[0].deviceId;
          }
        }
      });
      this.subscriptions.push(audioOutSubs);
  
      const audioInSubs = this.mediaService.selectedAudioInputId.subscribe( id => {
        this.selectedAudioInId = id;
        if (!id) {
          if (this.micDevicesInfos.length > 0) {
            this.mediaService.audioInputId = this.micDevicesInfos[0].deviceId;
          }
        }
      });
      this.subscriptions.push(audioInSubs);
    });
  }

  ngOnDestroy() {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
    this.stopAllStreamTracks();
  }

  async getDeviceInfos() {
    this.micDevicesInfos = await this.mediaService.getMediaSources('audioinput');
    this.speakerDevicesInfos = await this.mediaService.getMediaSources('audiooutput');
    this.camDevicesInfos = await this.mediaService.getMediaSources('videoinput');
  }

  onTabClick(tab: TabKind) {
    this.selectedTab = tab;
    this.mediaService.videoInputId = this.selectedVideoId;
  }

  onTestAudio() {
    this.testAudio.play();
  }

  onMicChange(value: string) {
    this.mediaService.audioInputId = value;
  }

  onSpeakerChange(value: string) {
    this.mediaService.audioOutputId = value;
  }

  onCameraChange(value: string) {
    this.mediaService.videoInputId = value;
  }

  onClose() {
    this.closed.emit();
  }

  private stopAllStreamTracks() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => {
        track.stop();
      });
    }
  }

  async getVideo(deviceId?: string) {
    this.stopAllStreamTracks();
    this.stream = await this.mediaService.getMediaStream(MediaStreamType.video, 80, 50, deviceId);
    this.videoSample.nativeElement.srcObject = this.stream;
    this.videoSample.nativeElement.onloadedmetadata = () => {
      this.videoSample.nativeElement.play();
    };
  }
}
