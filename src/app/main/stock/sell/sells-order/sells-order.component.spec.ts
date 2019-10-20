import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellsOrderComponent } from './sells-order.component';

describe('SellsOrderComponent', () => {
  let component: SellsOrderComponent;
  let fixture: ComponentFixture<SellsOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellsOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
