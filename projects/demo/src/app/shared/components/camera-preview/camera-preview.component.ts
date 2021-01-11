import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { faMicrophoneAlt, faMicrophoneAltSlash, faVideo, faVideoSlash, faCog } from '@fortawesome/free-solid-svg-icons'
import { Subscription } from 'rxjs';
import { MediaService, MediaStreamType } from '../../services/media.service';

@Component({
  selector: 'app-camera-preview',
  templateUrl: './camera-preview.component.html',
  styleUrls: ['./camera-preview.component.css']
})
export class CameraPreviewComponent implements AfterViewInit, OnDestroy {

  @ViewChild('camera') cameraElementRef!: ElementRef;
  private subscriptions: Subscription[] = [];
  private stream?: MediaStream;
  public microphoneIcon = faMicrophoneAlt;
  public microphoneMutedIcon = faMicrophoneAltSlash;
  public cameraIcon = faVideo;
  public cameraOffIcon = faVideoSlash;
  public settingIcon = faCog;
  public isCameraOff = false;
  public isMicrophoneMute = true;
  public selectedVideoInId?: string;
  showSettings = false;

  constructor(private mediaService: MediaService) {

  }

  ngAfterViewInit(): void {
    const vsubscription = this.mediaService.selectedVideoInputId.subscribe(id => {
      this.selectedVideoInId = id;
      this.startCameraMic(this.selectedVideoInId);
    });
    this.subscriptions.push(vsubscription);
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
    if (this.stream) {
      this.stream.getTracks().forEach(track => {
        track.stop();
      });
    }
  }

  async startCameraMic(camDeviceId?: string) {
    if (this.isCameraOff) {
      if (this.stream) {
        this.stream.getTracks().forEach(track => {
          track.stop();
        });
      }
      return;
    }
    const mediaStreamType = MediaStreamType.video;
    this.stream = await this.mediaService.getMediaStream(mediaStreamType, undefined, undefined, camDeviceId);

    this.cameraElementRef.nativeElement.srcObject = this.stream;
    this.cameraElementRef.nativeElement.onloadedmetadata = () => {
      this.cameraElementRef.nativeElement.play();
    };
  }

  onMicrophoneClicked(state: boolean) {
    this.isMicrophoneMute = state;
  }

  onCameraClicked(state: boolean) {
    this.isCameraOff = state;
    this.startCameraMic(this.selectedVideoInId);
  }

  onShowSettings() {
    this.showSettings = true;
  }

  onCloseSettings() {
    this.showSettings = false;
  }

}
