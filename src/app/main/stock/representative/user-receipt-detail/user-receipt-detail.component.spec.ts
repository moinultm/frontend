import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReceiptDetailComponent } from './user-receipt-detail.component';

describe('UserReceiptDetailComponent', () => {
  let component: UserReceiptDetailComponent;
  let fixture: ComponentFixture<UserReceiptDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserReceiptDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReceiptDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
