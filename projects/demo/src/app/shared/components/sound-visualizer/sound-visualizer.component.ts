import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { SoundMeter } from '../../../core/sound-meter';
import { MediaService } from '../../services/media.service';

const bars = 4;
@Component({
  selector: 'app-sound-visualizer',
  templateUrl: './sound-visualizer.component.html',
  styleUrls: ['./sound-visualizer.component.css']
})
export class SoundVisualizerComponent implements OnInit, OnDestroy {
  values = new Array<number>(bars);
  private soundMeter!: SoundMeter;
  private index = 0;
  private lastValue = 0;

  @Input() set mediaStream(value: MediaStream) {
    if (value) {
      this.connect(value);
    }
  }
  constructor(private mediaService: MediaService) {
    this.values.fill(3);
  }

  ngOnInit(): void { }

  async connect(stream: MediaStream): Promise<void> {
    this.soundMeter = new SoundMeter(new AudioContext());
    this.soundMeter.connect(
      stream,
      (instant) => this.updateVisualizer(instant),
      (error) => {
        if (error) {
          console.error('sound meter error: ', error.message, error.name);
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.soundMeter) {
      this.soundMeter.context.close();
    }
  }

  private updateVisualizer(value: number): void {
    if (value !== this.lastValue) {
      this.index++;
      if (this.index > (bars - 1)) { this.index = 0; }
      this.values[this.index] = Math.floor(value * 30) + 3;
      this.lastValue = value;
      setTimeout(() => {
        this.values.fill(3);
      }, 1000);
    }
  }
}
