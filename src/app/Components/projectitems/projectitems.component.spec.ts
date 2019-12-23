import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectitemsComponent } from './projectitems.component';

describe('ProjectitemsComponent', () => {
  let component: ProjectitemsComponent;
  let fixture: ComponentFixture<ProjectitemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectitemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
