import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAgoraSdkNgComponent } from './ngx-agora-sdk-ng.component';

describe('NgxAgoraSdkNgComponent', () => {
  let component: NgxAgoraSdkNgComponent;
  let fixture: ComponentFixture<NgxAgoraSdkNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxAgoraSdkNgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxAgoraSdkNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
