import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyprojectscheduleComponent } from './modifyprojectschedule.component';

describe('ModifyprojectscheduleComponent', () => {
  let component: ModifyprojectscheduleComponent;
  let fixture: ComponentFixture<ModifyprojectscheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyprojectscheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyprojectscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
