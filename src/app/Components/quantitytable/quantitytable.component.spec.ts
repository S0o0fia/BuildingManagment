import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantitytableComponent } from './quantitytable.component';

describe('QuantitytableComponent', () => {
  let component: QuantitytableComponent;
  let fixture: ComponentFixture<QuantitytableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantitytableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantitytableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
