import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierBillSummaryComponent } from './supplier-bill-summary.component';

describe('SupplierBillSummaryComponent', () => {
  let component: SupplierBillSummaryComponent;
  let fixture: ComponentFixture<SupplierBillSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierBillSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierBillSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
