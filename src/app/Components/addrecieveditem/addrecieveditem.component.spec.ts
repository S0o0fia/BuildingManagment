import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrecieveditemComponent } from './addrecieveditem.component';

describe('AddrecieveditemComponent', () => {
  let component: AddrecieveditemComponent;
  let fixture: ComponentFixture<AddrecieveditemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrecieveditemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrecieveditemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
