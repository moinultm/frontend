import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VatSettingsComponent } from './vat-settings.component';

describe('VatSettingsComponent', () => {
  let component: VatSettingsComponent;
  let fixture: ComponentFixture<VatSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VatSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VatSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
