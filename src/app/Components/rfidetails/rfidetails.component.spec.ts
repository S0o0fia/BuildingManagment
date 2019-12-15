import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfidetailsComponent } from './rfidetails.component';

describe('RfidetailsComponent', () => {
  let component: RfidetailsComponent;
  let fixture: ComponentFixture<RfidetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfidetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfidetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
