import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddconsualtantQTComponent } from './addconsualtant-qt.component';

describe('AddconsualtantQTComponent', () => {
  let component: AddconsualtantQTComponent;
  let fixture: ComponentFixture<AddconsualtantQTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddconsualtantQTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddconsualtantQTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
