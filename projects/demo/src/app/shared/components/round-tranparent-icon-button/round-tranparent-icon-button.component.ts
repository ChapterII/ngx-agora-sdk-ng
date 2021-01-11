import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-round-tranparent-icon-button',
  templateUrl: './round-tranparent-icon-button.component.html',
  styleUrls: ['./round-tranparent-icon-button.component.css'],
})
export class RoundTranparentIconButtonComponent implements OnInit {

  @Input() activeColor = 'red';
  @Input() type: 'toggle' | 'normal' = 'normal';
  @Input() activeIcon: any;
  @Input() activeIconStyle = {stroke: 'white', color: 'white'};
  @Input() inactiveIcon: any;
  @Input() inactiveIconStyle = {stroke: 'white', color: 'white'};
  @Output() onClick = new EventEmitter<boolean>();
  @Input() isActive = false;

  buttonStyle = {
    active: {
      backgroundColor: this.activeColor,
    }
  };

  constructor() { }

  ngOnInit(): void { }

  click(): void {
    if (this.type === 'toggle') {
      this.isActive = !this.isActive;
    }
    this.onClick.emit(this.isActive);
  }

}
