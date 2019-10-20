import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseStatusReportComponent } from './purchase-status-report.component';

describe('PurchaseStatusReportComponent', () => {
  let component: PurchaseStatusReportComponent;
  let fixture: ComponentFixture<PurchaseStatusReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseStatusReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseStatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
