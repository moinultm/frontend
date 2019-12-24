import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSellReportComponent } from './total-sell-report.component';

describe('TotalSellReportComponent', () => {
  let component: TotalSellReportComponent;
  let fixture: ComponentFixture<TotalSellReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalSellReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalSellReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
