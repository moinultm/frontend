import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionStatusReportComponent } from './transaction-status-report.component';

describe('TransactionStatusReportComponent', () => {
  let component: TransactionStatusReportComponent;
  let fixture: ComponentFixture<TransactionStatusReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionStatusReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionStatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
