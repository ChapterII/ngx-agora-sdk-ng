import { Injectable } from "@angular/core";
import { Subject } from "rxjs/internal/Subject";

@Injectable({
    providedIn: 'root'
})
export class SoundMeterService {

    private mediaStreamSource = new Subject<MediaStream>();
    mediaStream$ = this.mediaStreamSource.asObservable();

    public setStream(stream: MediaStream) {
        this.mediaStreamSource.next(stream);
    }

}