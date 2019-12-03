import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttendeceComponent } from './add-attendece.component';

describe('AddAttendeceComponent', () => {
  let component: AddAttendeceComponent;
  let fixture: ComponentFixture<AddAttendeceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAttendeceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttendeceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
