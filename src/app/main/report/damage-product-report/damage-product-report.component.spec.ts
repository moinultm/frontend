import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageProductReportComponent } from './damage-product-report.component';

describe('DamageProductReportComponent', () => {
  let component: DamageProductReportComponent;
  let fixture: ComponentFixture<DamageProductReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DamageProductReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DamageProductReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
