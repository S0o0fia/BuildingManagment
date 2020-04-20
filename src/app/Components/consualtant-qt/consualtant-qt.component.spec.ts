import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsualtantQTComponent } from './consualtant-qt.component';

describe('ConsualtantQTComponent', () => {
  let component: ConsualtantQTComponent;
  let fixture: ComponentFixture<ConsualtantQTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsualtantQTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsualtantQTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
