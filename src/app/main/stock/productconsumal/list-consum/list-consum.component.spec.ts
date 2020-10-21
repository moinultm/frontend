import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConsumComponent } from './list-consum.component';

describe('ListConsumComponent', () => {
  let component: ListConsumComponent;
  let fixture: ComponentFixture<ListConsumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListConsumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListConsumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
