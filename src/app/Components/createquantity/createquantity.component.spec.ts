import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatequantityComponent } from './createquantity.component';

describe('CreatequantityComponent', () => {
  let component: CreatequantityComponent;
  let fixture: ComponentFixture<CreatequantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatequantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatequantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
