import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsalesComponent } from './newsales.component';

describe('NewsalesComponent', () => {
  let component: NewsalesComponent;
  let fixture: ComponentFixture<NewsalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
