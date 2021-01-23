import { TestBed } from '@angular/core/testing';

import { NgxAgoraSdkNgService } from './ngx-agora-sdk-ng.service.ts';

describe('NgxAgoraSdkNgService', () => {
  let service: NgxAgoraSdkNgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxAgoraSdkNgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
