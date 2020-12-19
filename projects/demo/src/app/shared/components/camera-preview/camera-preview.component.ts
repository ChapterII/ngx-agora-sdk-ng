import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SoundMeterService } from '../sound-meter/sound-meter.service';

@Component({
  selector: 'app-camera-preview',
  templateUrl: './camera-preview.component.html',
  styleUrls: ['./camera-preview.component.css']
})
export class CameraPreviewComponent implements OnInit, AfterViewInit {

  @ViewChild('camera') cameraElementRef!: ElementRef;
  isCameraShow: boolean = true;

  constraints: any = { audio: false, video: false }

  constructor(private meterState: SoundMeterService) { }

  ngAfterViewInit(): void {

    if (this.constraints.video == true) {
      navigator.mediaDevices.getUserMedia(this.constraints).then(stream => {
        this.meterState.setStream(stream);
        this.cameraElementRef.nativeElement.srcObject = stream;
        this.cameraElementRef.nativeElement.onloadedmetadata = () => {
          this.cameraElementRef.nativeElement.play();
        };
      });
    }
    else {
      this.cameraElementRef.nativeElement.hidden = true;
    }


  }

  showOffCamera(){
    this.constraints.video = !this.constraints.video;
  }

  ngOnInit(): void {

  }

}
