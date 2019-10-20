import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSalesInvoicesComponent } from './user-sales-invoices.component';

describe('UserSalesInvoicesComponent', () => {
  let component: UserSalesInvoicesComponent;
  let fixture: ComponentFixture<UserSalesInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSalesInvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSalesInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
