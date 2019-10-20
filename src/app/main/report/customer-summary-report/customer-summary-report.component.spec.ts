import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSummaryReportComponent } from './customer-summary-report.component';

describe('CustomerSummaryReportComponent', () => {
  let component: CustomerSummaryReportComponent;
  let fixture: ComponentFixture<CustomerSummaryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSummaryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
