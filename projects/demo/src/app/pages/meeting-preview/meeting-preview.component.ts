import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../shared/services/media.service';

@Component({
  selector: 'app-meeting-preview',
  templateUrl: './meeting-preview.component.html',
  styleUrls: ['./meeting-preview.component.css']
})
export class MeetingPreviewComponent implements OnInit {


  constructor(public mediaService: MediaService) {
  }

  ngOnInit(): void {
  }

}
