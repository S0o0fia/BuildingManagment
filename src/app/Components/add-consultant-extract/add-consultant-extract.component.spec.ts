import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConsultantExtractComponent } from './add-consultant-extract.component';

describe('AddConsultantExtractComponent', () => {
  let component: AddConsultantExtractComponent;
  let fixture: ComponentFixture<AddConsultantExtractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddConsultantExtractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConsultantExtractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
