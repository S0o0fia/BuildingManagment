import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivestageComponent } from './activestage.component';

describe('ActivestageComponent', () => {
  let component: ActivestageComponent;
  let fixture: ComponentFixture<ActivestageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivestageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivestageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
