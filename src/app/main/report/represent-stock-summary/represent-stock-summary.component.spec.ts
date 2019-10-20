import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentStockSummaryComponent } from './represent-stock-summary.component';

describe('RepresentStockSummaryComponent', () => {
  let component: RepresentStockSummaryComponent;
  let fixture: ComponentFixture<RepresentStockSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepresentStockSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentStockSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
