import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContractedQunatityComponent } from './edit-contracted-qunatity.component';

describe('EditContractedQunatityComponent', () => {
  let component: EditContractedQunatityComponent;
  let fixture: ComponentFixture<EditContractedQunatityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditContractedQunatityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditContractedQunatityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
