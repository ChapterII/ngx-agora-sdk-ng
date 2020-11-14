## Angular library for Agora 

[![npm version](https://badge.fury.io/js/ngx-agora-sdk-ng.svg)](https://badge.fury.io/js/ngx-agora-sdk-ng)

Angular library for the Agora Web SDK next-generation client from [Agora.io](https://www.agora.io/en/)
 
Run the following command to install the library.
<strong><pre>npm i ngx-agora-sdk-ng </pre></strong>


### Import Module
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

## Compatibility
