import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumeProductReportComponent } from './consume-product-report.component';

describe('ConsumeProductReportComponent', () => {
  let component: ConsumeProductReportComponent;
  let fixture: ComponentFixture<ConsumeProductReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumeProductReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumeProductReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
