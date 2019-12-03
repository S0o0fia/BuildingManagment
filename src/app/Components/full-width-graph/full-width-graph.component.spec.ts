import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullWidthGraphComponent } from './full-width-graph.component';

describe('FullWidthGraphComponent', () => {
  let component: FullWidthGraphComponent;
  let fixture: ComponentFixture<FullWidthGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullWidthGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullWidthGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
