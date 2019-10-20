import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellsStatusReportComponent } from './sells-status-report.component';

describe('SellsStatusReportComponent', () => {
  let component: SellsStatusReportComponent;
  let fixture: ComponentFixture<SellsStatusReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellsStatusReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellsStatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
