# Angular library for Agora 

[![npm version](https://badge.fury.io/js/ngx-agora-sdk-ng.svg)](https://badge.fury.io/js/ngx-agora-sdk-ng)

Angular library for the Agora Web SDK next-generation client from [Agora.io](https://www.agora.io/en/) enabling audio and video real-time communications based on Agora SD-RTN™ and implementing scenarios such as voice-only calls, video call, voice-only interactive broadcast, and video interactive broadcast. 

## Prerequisites
Before using the Library, you need to:

1. Get a valid Agora account. ([Sign up](https://sso.agora.io/en/signup?_ga=2.63500074.482805615.1577072824-849535803.1560925029) for free.)
2. Create a project in [Agora Console](https://console.agora.io/) and choose **APP ID** for authentication.

## Installing
Run the following command to install the library.
<strong><pre>npm i ngx-agora-sdk-ng </pre></strong>

### Import Module
Import **NgxAgoraSdkNgModule** from `ngx-agora-sdk-ng` and add the module to the imports array with configuration. 
* Replace your own appId in `agora-appId`.
```ts
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxAgoraSdkNgModule } from 'ngx-agora-sdk-ng';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxAgoraSdkNgModule.forRoot({
      AppID: 'agora-appId',
      Video: { codec: 'h264', mode: 'rtc', role: 'host' }
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
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


Deployment notes | 
------------ | 
Due to security limits on HTTP addresses except 127.0.0.1, the library only supports HTTPS or http://localhost (http://127.0.0.1). If you deploy your project over HTTP, you can only visit your project at http://localhost（http://127.0.0.1). |

## Implement the Basic Video Call

