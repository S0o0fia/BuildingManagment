import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RFIStatusComponent } from './rfistatus.component';

describe('RFIStatusComponent', () => {
  let component: RFIStatusComponent;
  let fixture: ComponentFixture<RFIStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RFIStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RFIStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
