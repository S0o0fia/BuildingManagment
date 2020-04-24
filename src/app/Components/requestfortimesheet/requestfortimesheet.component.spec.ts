import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestfortimesheetComponent } from './requestfortimesheet.component';

describe('RequestfortimesheetComponent', () => {
  let component: RequestfortimesheetComponent;
  let fixture: ComponentFixture<RequestfortimesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestfortimesheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestfortimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
