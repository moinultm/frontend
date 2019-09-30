import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockGeneralReportComponent } from './stock-general-report.component';

describe('StockGeneralReportComponent', () => {
  let component: StockGeneralReportComponent;
  let fixture: ComponentFixture<StockGeneralReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockGeneralReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockGeneralReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
