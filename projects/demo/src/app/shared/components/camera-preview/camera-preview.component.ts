import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-camera-preview',
  templateUrl: './camera-preview.component.html',
  styleUrls: ['./camera-preview.component.css']
})
export class CameraPreviewComponent implements OnInit, AfterViewInit {

  @ViewChild('camera') camera!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
   
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      this.camera.nativeElement.srcObject = stream;
    });
    
  }

  ngOnInit(): void {



  }

}
