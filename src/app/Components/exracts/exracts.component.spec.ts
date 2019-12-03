import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExractsComponent } from './exracts.component';

describe('ExractsComponent', () => {
  let component: ExractsComponent;
  let fixture: ComponentFixture<ExractsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExractsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
