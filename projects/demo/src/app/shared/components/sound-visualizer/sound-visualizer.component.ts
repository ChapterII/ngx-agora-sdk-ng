import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { SoundMeter } from '../../../core/sound-meter';
import { MediaService, MediaStreamType } from '../../services/media.service';

const bars = 4;
@Component({
  selector: 'app-sound-visualizer',
  templateUrl: './sound-visualizer.component.html',
  styleUrls: ['./sound-visualizer.component.css']
})
export class SoundVisualizerComponent implements OnInit, OnDestroy, AfterViewInit {
  values = new Array<number>(bars);
  private soundMeter!: SoundMeter;
  private subscription?: Subscription;
  private index = 0;
  private lastValue = 0;
  private timer: any;
  constructor(private mediaService: MediaService) {
    this.values.fill(3);
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.connect();
    this.subscription = this.mediaService.selectedAudioInputId.subscribe(id => {
      if (id) {
        this.connect(id);
      }
    });
  }

  async connect(deviceId?: string) {
    const stream = await this.mediaService.getMediaStream(MediaStreamType.audio, undefined, undefined, undefined, deviceId);
    if (!stream) {
      return;
    }
    this.soundMeter = new SoundMeter(new AudioContext());
    this.soundMeter.connect(stream!,
      (instant) => this.updateVisualizer(instant),
      (error) => console.debug('navigator.MediaDevices.getUserMedia error: ', error.message, error.name)
    );
  }

  ngOnDestroy(): void {
    if (this.soundMeter) {
      this.soundMeter.context.close();
    }
    this.subscription?.unsubscribe();
  }

  private updateVisualizer(value: number) {
    if (value !== this.lastValue) {
      this.index++;
      if (this.index > (bars - 1)) { this.index = 0; }
      this.values[this.index] = Math.floor(value * 30) + 3;
      this.lastValue = value;
      this.timer = setTimeout(() => {
        this.values.fill(3);
      }, 1000);
    }
  }
}
