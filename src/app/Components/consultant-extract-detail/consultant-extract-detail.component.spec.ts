import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantExtractDetailComponent } from './consultant-extract-detail.component';

describe('ConsultantExtractDetailComponent', () => {
  let component: ConsultantExtractDetailComponent;
  let fixture: ComponentFixture<ConsultantExtractDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantExtractDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantExtractDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
