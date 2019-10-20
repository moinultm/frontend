import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentStockReportComponent } from './represent-stock-report.component';

describe('RepresentStockReportComponent', () => {
  let component: RepresentStockReportComponent;
  let fixture: ComponentFixture<RepresentStockReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepresentStockReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentStockReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
