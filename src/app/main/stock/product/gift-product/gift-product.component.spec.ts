import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftProductComponent } from './gift-product.component';

describe('GiftProductComponent', () => {
  let component: GiftProductComponent;
  let fixture: ComponentFixture<GiftProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
