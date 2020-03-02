import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdetailsComponent } from './countdetails.component';

describe('CountdetailsComponent', () => {
  let component: CountdetailsComponent;
  let fixture: ComponentFixture<CountdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
