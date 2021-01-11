import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingParticipantControlsComponent } from './meeting-participant-controls.component';

describe('MeetingParticipantControlsComponent', () => {
  let component: MeetingParticipantControlsComponent;
  let fixture: ComponentFixture<MeetingParticipantControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingParticipantControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingParticipantControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
