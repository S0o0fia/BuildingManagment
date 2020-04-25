import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantExtractComponent } from './consultant-extract.component';

describe('ConsultantExtractComponent', () => {
  let component: ConsultantExtractComponent;
  let fixture: ComponentFixture<ConsultantExtractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantExtractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantExtractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
