import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { faVideo, faPhoneVolume, faMicrophoneAlt, faVolumeUp, faTimes } from '@fortawesome/free-solid-svg-icons';

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
export class InputOutputSettingsComponent implements OnInit {
  @ViewChild('videoSample') videoSample!: ElementRef;
  @Output() closed = new EventEmitter();
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

  constructor(private mediaService: MediaService) { }

  ngOnInit(): void {
    this.getDeviceInfos();
    this.testAudio.src = 'assets/audio/piano-test.mp3';
    this.mediaService.selectedVideoInputId.subscribe(id => {
      this.selectedVideoId = id;
      if (id && this.selectedTab === TabKind.video) {
        this.getVideo(id);
      }
    });
    this.mediaService.selectedAudioOutputId.subscribe(id => {
      this.selectedAudioOutId = id;
      if( id && this.selectedTab === TabKind.audio) {
        this.mediaService.setSinkID(this.testAudio, id);
      }
    });
    this.mediaService.selectedAudioInputId.subscribe( id => {
      this.selectedAudioInId = id;
      if( id && this.selectedTab === TabKind.audio) {
        // TODO: add set mic source
      }
    });
  }

  async getDeviceInfos() {
    this.micDevicesInfos = await this.mediaService.getMediaSources('audioinput');
    this.speakerDevicesInfos = await this.mediaService.getMediaSources('audiooutput');
    if (this.speakerDevicesInfos.length > 0) {
      this.mediaService.audioOutputId = this.speakerDevicesInfos[0].deviceId;
    }
    this.camDevicesInfos = await this.mediaService.getMediaSources('videoinput');
    if (this.camDevicesInfos.length > 0) {
      this.mediaService.videoInputId = this.camDevicesInfos[0].deviceId;
    }
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

  async getVideo(deviceId?: string) {
    this.stream = await this.mediaService.getMediaStream(MediaStreamType.video, 80, 50, deviceId);
    this.videoSample.nativeElement.srcObject = this.stream;
    this.videoSample.nativeElement.onloadedmetadata = () => {
      this.videoSample.nativeElement.play();
    };
  }
}
