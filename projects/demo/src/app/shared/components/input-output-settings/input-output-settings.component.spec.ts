import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOutputSettingsComponent } from './input-output-settings.component';

describe('InputOutputSettingsComponent', () => {
  let component: InputOutputSettingsComponent;
  let fixture: ComponentFixture<InputOutputSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputOutputSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputOutputSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
