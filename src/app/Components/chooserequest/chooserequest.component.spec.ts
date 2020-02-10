import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooserequestComponent } from './chooserequest.component';

describe('ChooserequestComponent', () => {
  let component: ChooserequestComponent;
  let fixture: ComponentFixture<ChooserequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooserequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooserequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
