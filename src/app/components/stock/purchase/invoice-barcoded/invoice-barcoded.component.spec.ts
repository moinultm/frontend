import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceBarcodedComponent } from './invoice-barcoded.component';

describe('InvoiceBarcodedComponent', () => {
  let component: InvoiceBarcodedComponent;
  let fixture: ComponentFixture<InvoiceBarcodedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceBarcodedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceBarcodedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
