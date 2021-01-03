import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingPageComponent } from './meeting-page.component';

describe('MeetingPageComponent', () => {
  let component: MeetingPageComponent;
  let fixture: ComponentFixture<MeetingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
