import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundTranparentIconButtonComponent } from './round-tranparent-icon-button.component';

describe('RoundTranparentIconButtonComponent', () => {
  let component: RoundTranparentIconButtonComponent;
  let fixture: ComponentFixture<RoundTranparentIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundTranparentIconButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundTranparentIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
