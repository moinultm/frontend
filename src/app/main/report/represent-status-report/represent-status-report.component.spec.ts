import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentStatusReportComponent } from './represent-status-report.component';

describe('RepresentStatusReportComponent', () => {
  let component: RepresentStatusReportComponent;
  let fixture: ComponentFixture<RepresentStatusReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepresentStatusReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentStatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
