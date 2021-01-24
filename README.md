# Video and Voice Conferencing in Angular
<div style="display:flex">
  <img src="docs/images/angular-logo.svg" width="50px" height="50px" alt="Angular"/>
  <img src="docs/images/agora-logo.png" width="50px" height="50px" alt="Agora"/>
</div>

[![npm version](https://badge.fury.io/js/ngx-agora-sdk-ng.svg)](https://badge.fury.io/js/ngx-agora-sdk-ng)

[Angular](https://angular.io/) library for the Agora Web SDK next-generation client from [Agora.io](https://www.agora.io/en/) enabling audio and video real-time communications based on Agora SD-RTN™ and implementing scenarios such as voice-only calls, video call, voice-only interactive broadcast, and video interactive broadcast. 

## Prerequisites
Before using the Library, you need to:

1. Get a valid Agora account. ([Sign up](https://sso.agora.io/en/signup?_ga=2.63500074.482805615.1577072824-849535803.1560925029) for free.)
2. Create a project in [Agora Console](https://console.agora.io/) and choose **APP ID** for authentication.

## Installing
Run the following command to install the library.
<strong><pre>npm i ngx-agora-sdk-ng </pre></strong>

## Demo 
Here is the [demo](https://ngx-agora-sk-ng-demo.web.app/) link. In this link you could see the features that are using `ngx-agora-sdk-ng` library. We are working on it in these days and add amazing features. Acually we want show power of agora in demo project. You can make a project like [Google meet](https://meet.google.com/).

### Import Module
Import **NgxAgoraSdkNgModule** from `ngx-agora-sdk-ng` and add the module to the imports array with configuration. 
* Replace your own appId in `agora-appId`.
```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxAgoraSdkNgModule } from 'ngx-agora-sdk-ng';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxAgoraSdkNgModule.forRoot({
      AppID: 'replace-agora-appId',
      Video: { codec: 'h264', mode: 'rtc', role: 'host' }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

### Import Service
Import **NgxAgoraSdkNgService** from `ngx-agora-sdk-ng` into your component or service to use. 
```ts
import { Component } from '@angular/core';
import { NgxAgoraSdkNgService } from 'ngx-agora-sdk-ng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'demo';

  constructor(private agoraService: NgxAgoraSdkNgService) { }
}
```

### There are useful methods.

### By using this method, you will join a channel. So this method enable both video and voice. 
```ts
join(channelName: string, token: string, uid?: string): IJoinChannel<IMediaTrack>;
```
### By using this method, you will join a video channel. 
```ts
joinVideo(channelName: string, token: string, uid?: string): IVideoJoinChannel<IVideoTrack>;
```
### By using this method, you will join a voice channel. 
```ts
joinAudio(channelName: string, token: string, uid?: string): IAudioJoinChannel<IAudioTrack>;
```
### By using this method, you will leave from a channel. 
```ts
leave(): Promise<any>;
```
### By using this method, you could get all cameras that connected in your device. 
```ts
getCameras(): Promise<MediaDeviceInfo[]>;
```
### By using this method, you could get all microphones that connected in your device. 
```ts
getMicrophones(): Promise<MediaDeviceInfo[]>;
```
### By using this method, you could get both microphones and cameras that connected in your device. 
```ts
getDevices(): Promise<MediaDeviceInfo[]>;
```
### By using this method, you could observe remote user status, for instance if a user leave a chananel or connect it will raise. 
```ts
onRemoteUsersStatusChange(): Observable<UserState>;
```
### When a remote user join a channel this event will be fired. 
```ts
onRemoteUserJoined(): Observable<IRemoteUser>;
```
### When a remote user leave a channel this event will be fired. 
```ts
onRemoteUserLeft(): Observable<{ user: IRemoteUser, reason: string }>;
```
### When a remote user change their volume this event will be fired. 
```ts
onRemoteVolumeIndicator(): Observable<Array<{ level: number, uid: number | string }>>;
```
### This event will be fired, if local network quality is changed. 
```ts
onLocalNetworkQualityChange(): Observable<NetworkQuality>;
```
### This event will be fired, if local user join into channel.
```ts
onLocalUserJoined(): Observable<{ track: IMediaTrack }>;
```
### This event will be fired, if local user leave a channel.
```ts
onLocalUserLeft(): Observable<{ user: IRemoteUser, reason: string }>;
```

Deployment notes | 
------------ | 
Due to security limits on HTTP addresses except 127.0.0.1, the library only supports HTTPS or http://localhost (http://127.0.0.1). If you deploy your project over HTTP, you can only visit your project at http://localhost（http://127.0.0.1). |



------------
Made with ❤️
