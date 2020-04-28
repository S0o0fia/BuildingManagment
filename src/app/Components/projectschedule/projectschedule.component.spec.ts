import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectscheduleComponent } from './projectschedule.component';

describe('ProjectscheduleComponent', () => {
  let component: ProjectscheduleComponent;
  let fixture: ComponentFixture<ProjectscheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectscheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
