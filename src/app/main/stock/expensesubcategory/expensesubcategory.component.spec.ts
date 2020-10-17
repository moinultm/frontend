import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesubcategoryComponent } from './expensesubcategory.component';

describe('ExpensesubcategoryComponent', () => {
  let component: ExpensesubcategoryComponent;
  let fixture: ComponentFixture<ExpensesubcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesubcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
