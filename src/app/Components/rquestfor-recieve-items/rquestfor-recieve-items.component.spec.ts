import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RquestforRecieveItemsComponent } from './rquestfor-recieve-items.component';

describe('RquestforRecieveItemsComponent', () => {
  let component: RquestforRecieveItemsComponent;
  let fixture: ComponentFixture<RquestforRecieveItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RquestforRecieveItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RquestforRecieveItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
