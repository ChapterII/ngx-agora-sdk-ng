import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {

  remotes: Array<any> = new Array<any>();

  
  constructor() {

    for (let index = 0; index < 10; index++) {
      this.remotes.push('client:' + index);
    }

  }

  ngOnInit(): void {
  }

}
