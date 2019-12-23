import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftProductReportComponent } from './gift-product-report.component';

describe('GiftProductReportComponent', () => {
  let component: GiftProductReportComponent;
  let fixture: ComponentFixture<GiftProductReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftProductReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftProductReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
