import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExtractComponent } from './add-extract.component';

describe('AddExtractComponent', () => {
  let component: AddExtractComponent;
  let fixture: ComponentFixture<AddExtractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExtractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExtractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
