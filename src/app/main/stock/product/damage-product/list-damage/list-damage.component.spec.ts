import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDamageComponent } from './list-damage.component';

describe('ListDamageComponent', () => {
  let component: ListDamageComponent;
  let fixture: ComponentFixture<ListDamageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDamageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
