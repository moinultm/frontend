import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageProductComponent } from './damage-product.component';

describe('DamageProductComponent', () => {
  let component: DamageProductComponent;
  let fixture: ComponentFixture<DamageProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DamageProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DamageProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
