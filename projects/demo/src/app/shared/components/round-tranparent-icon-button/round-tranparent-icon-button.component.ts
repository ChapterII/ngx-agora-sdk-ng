import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-round-tranparent-icon-button',
  templateUrl: './round-tranparent-icon-button.component.html',
  styleUrls: ['./round-tranparent-icon-button.component.css']
})
export class RoundTranparentIconButtonComponent implements OnInit {
  @Input() activecolor: string = 'red';
  @Input() type: 'toggle' | 'normal' = 'normal';
  @Input() activeIcon: any;
  @Input() inactiveIcon: any;

  @Output() clicked = new EventEmitter<boolean>();
  
  active: boolean = false;
  buttonStyle = {
    active: {
      backgroundColor: this.activecolor,
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    if (this.type === 'toggle') {
      this.active = !this.active;
    }
    this.clicked.emit(this.active);
  }

}
