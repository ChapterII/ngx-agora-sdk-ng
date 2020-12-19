import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SoundMeterService } from '../sound-meter/sound-meter.service';
import { faMicrophoneAlt, faMicrophoneAltSlash, faVideo, faVideoSlash, faCog } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-camera-preview',
  templateUrl: './camera-preview.component.html',
  styleUrls: ['./camera-preview.component.css']
})
export class CameraPreviewComponent implements AfterViewInit {

  @ViewChild('camera') cameraElementRef!: ElementRef;

  public microphoneIcon = faMicrophoneAlt;
  public microphoneMutedIcon = faMicrophoneAltSlash;
  public cameraIcon = faVideo;
  public cameraOffIcon = faVideoSlash;
  public settingIcon = faCog;
  public isCameraOff = false;
  public isMicrophoneMute = true;


  constructor(private meterState: SoundMeterService) {

  }

  ngAfterViewInit(): void {


    navigator.mediaDevices.getUserMedia({ audio: !this.isMicrophoneMute, video: !this.isCameraOff }).then(stream => {
      this.meterState.setStream(stream);
      this.cameraElementRef.nativeElement.srcObject = stream;
      this.cameraElementRef.nativeElement.onloadedmetadata = () => {
        this.cameraElementRef.nativeElement.play();
      };
    });

  }


  onMicrophoneClicked(state: boolean) {
    this.isMicrophoneMute = state;



    navigator.mediaDevices.getUserMedia({ audio: !this.isMicrophoneMute, video: !this.isCameraOff }).then(stream => {
      this.meterState.setStream(stream);
      this.cameraElementRef.nativeElement.srcObject = stream;
      this.cameraElementRef.nativeElement.onloadedmetadata = () => {
        this.cameraElementRef.nativeElement.play();
      };
    });

  }

  onCameraClicked(state: boolean) {

    this.isCameraOff = state;

    navigator.mediaDevices.getUserMedia({ audio: !this.isMicrophoneMute, video: !this.isCameraOff }).then(stream => {
      this.meterState.setStream(stream);
      this.cameraElementRef.nativeElement.srcObject = stream;
      this.cameraElementRef.nativeElement.onloadedmetadata = () => {
        this.cameraElementRef.nativeElement.play();
      };
    });

  }


}
