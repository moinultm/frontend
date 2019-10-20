import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSalesListComponent } from './user-sales-list.component';

describe('UserSalesListComponent', () => {
  let component: UserSalesListComponent;
  let fixture: ComponentFixture<UserSalesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSalesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSalesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
