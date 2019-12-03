import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestForInspectionComponent } from './request-for-inspection.component';

describe('RequestForInspectionComponent', () => {
  let component: RequestForInspectionComponent;
  let fixture: ComponentFixture<RequestForInspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestForInspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestForInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
