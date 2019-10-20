import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSellReportComponent } from './product-sell-report.component';

describe('ProductSellReportComponent', () => {
  let component: ProductSellReportComponent;
  let fixture: ComponentFixture<ProductSellReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSellReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSellReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
