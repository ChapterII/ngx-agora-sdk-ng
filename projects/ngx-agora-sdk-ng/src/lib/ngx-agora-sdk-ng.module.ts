import { ModuleWithProviders, NgModule } from '@angular/core';
import { AgoraConfig } from './agora-config';
import { NgxAgoraSdkNgComponent } from './ngx-agora-sdk-ng.component';
import { NgxAgoraSdkNgService } from './ngx-agora-sdk-ng.service';


@NgModule({
  declarations: [NgxAgoraSdkNgComponent],
  imports: [],
  exports: [NgxAgoraSdkNgComponent]
})
export class NgxAgoraSdkNgModule {


  static forRoot(config: AgoraConfig): ModuleWithProviders<NgxAgoraSdkNgModule> {
    return {
      ngModule: NgxAgoraSdkNgModule,
      providers: [NgxAgoraSdkNgService, { provide: 'config', useValue: config }]
    };
  }


 }
