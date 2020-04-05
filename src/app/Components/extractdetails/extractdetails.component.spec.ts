import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtractdetailsComponent } from './extractdetails.component';

describe('ExtractdetailsComponent', () => {
  let component: ExtractdetailsComponent;
  let fixture: ComponentFixture<ExtractdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtractdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtractdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
