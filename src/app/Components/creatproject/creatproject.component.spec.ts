import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatprojectComponent } from './creatproject.component';

describe('CreatprojectComponent', () => {
  let component: CreatprojectComponent;
  let fixture: ComponentFixture<CreatprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
