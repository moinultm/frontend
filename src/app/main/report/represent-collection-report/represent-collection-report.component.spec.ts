import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentCollectionReportComponent } from './represent-collection-report.component';

describe('RepresentCollectionReportComponent', () => {
  let component: RepresentCollectionReportComponent;
  let fixture: ComponentFixture<RepresentCollectionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepresentCollectionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentCollectionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
