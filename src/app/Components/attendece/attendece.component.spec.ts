import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeceComponent } from './attendece.component';

describe('AttendeceComponent', () => {
  let component: AttendeceComponent;
  let fixture: ComponentFixture<AttendeceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendeceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendeceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
