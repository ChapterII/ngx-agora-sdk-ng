import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SoundMeter } from '../../../core/sound-meter';
import { MediaService, MediaStreamType } from '../../services/media.service';

@Component({
  selector: 'app-sound-meter',
  templateUrl: './sound-meter.component.html',
  styleUrls: ['./sound-meter.component.css']
})
export class SoundMeterComponent implements AfterViewInit, OnDestroy {

  @ViewChild("meter") meterRef!: ElementRef;
  private soundMeter!: SoundMeter;
  private subscription?: Subscription;

  constructor(private mediaService: MediaService) { }

  ngAfterViewInit() {
    this.connect();
    this.subscription = this.mediaService.selectedAudioInputId.subscribe(id => {
      if (id) {
        this.connect(id);
      }
    });
  }

  async connect(deviceId?: string) {
    const stream = await this.mediaService.getMediaStream(MediaStreamType.audio, undefined, undefined,undefined, deviceId);
    if (!stream) {
      return;
    }
    this.soundMeter = new SoundMeter(new AudioContext());
    this.soundMeter.connect(stream!,
      (instant) => this.meterRef ? this.meterRef.nativeElement.value = instant : null,
      (error) => console.debug('navigator.MediaDevices.getUserMedia error: ', error.message, error.name)
    );
  }

  ngOnDestroy(): void {
    if (this.soundMeter) {
      this.soundMeter.context.close();
    }
    this.subscription?.unsubscribe();
  }

}
