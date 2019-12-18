import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallanProductReportComponent } from './challan-product-report.component';

describe('ChallanProductReportComponent', () => {
  let component: ChallanProductReportComponent;
  let fixture: ComponentFixture<ChallanProductReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallanProductReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallanProductReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
