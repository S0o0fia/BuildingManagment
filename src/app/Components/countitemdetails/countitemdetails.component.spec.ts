import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountitemdetailsComponent } from './countitemdetails.component';

describe('CountitemdetailsComponent', () => {
  let component: CountitemdetailsComponent;
  let fixture: ComponentFixture<CountitemdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountitemdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountitemdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
