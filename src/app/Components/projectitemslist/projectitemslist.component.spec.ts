import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectitemslistComponent } from './projectitemslist.component';

describe('ProjectitemslistComponent', () => {
  let component: ProjectitemslistComponent;
  let fixture: ComponentFixture<ProjectitemslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectitemslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectitemslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
