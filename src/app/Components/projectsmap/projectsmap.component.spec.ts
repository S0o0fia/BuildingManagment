import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsmapComponent } from './projectsmap.component';

describe('ProjectsmapComponent', () => {
  let component: ProjectsmapComponent;
  let fixture: ComponentFixture<ProjectsmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
