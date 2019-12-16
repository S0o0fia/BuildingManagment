import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectApproveComponent } from './select-approve.component';

describe('SelectApproveComponent', () => {
  let component: SelectApproveComponent;
  let fixture: ComponentFixture<SelectApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
