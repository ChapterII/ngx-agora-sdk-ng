import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundMeterComponent } from './sound-meter.component';

describe('SoundMeterComponent', () => {
  let component: SoundMeterComponent;
  let fixture: ComponentFixture<SoundMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoundMeterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
