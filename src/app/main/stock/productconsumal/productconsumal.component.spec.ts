import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductconsumalComponent } from './productconsumal.component';

describe('ProductconsumalComponent', () => {
  let component: ProductconsumalComponent;
  let fixture: ComponentFixture<ProductconsumalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductconsumalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductconsumalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
