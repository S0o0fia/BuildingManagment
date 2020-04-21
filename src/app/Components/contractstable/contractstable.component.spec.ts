import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractstableComponent } from './contractstable.component';

describe('ContractstableComponent', () => {
  let component: ContractstableComponent;
  let fixture: ComponentFixture<ContractstableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractstableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractstableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
