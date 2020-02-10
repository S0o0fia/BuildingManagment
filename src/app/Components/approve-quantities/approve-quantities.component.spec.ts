import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveQuantitiesComponent } from './approve-quantities.component';

describe('ApproveQuantitiesComponent', () => {
  let component: ApproveQuantitiesComponent;
  let fixture: ComponentFixture<ApproveQuantitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveQuantitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveQuantitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
