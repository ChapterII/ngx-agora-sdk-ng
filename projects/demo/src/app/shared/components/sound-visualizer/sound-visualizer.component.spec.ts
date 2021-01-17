import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundVisualizerComponent } from './sound-visualizer.component';

describe('SoundVisualizerComponent', () => {
  let component: SoundVisualizerComponent;
  let fixture: ComponentFixture<SoundVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoundVisualizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
