import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private mediaDevicesInfos: MediaDeviceInfo[] = [];

  constructor() {
  }

  async getMediaSources(kind: MediaDeviceKind) {
    await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    this.mediaDevicesInfos = await navigator.mediaDevices.enumerateDevices();
    return this.mediaDevicesInfos.filter(mdi => mdi.kind === kind);
  }
}