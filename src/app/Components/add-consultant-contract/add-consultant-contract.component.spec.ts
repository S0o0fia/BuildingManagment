import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConsultantContractComponent } from './add-consultant-contract.component';

describe('AddConsultantContractComponent', () => {
  let component: AddConsultantContractComponent;
  let fixture: ComponentFixture<AddConsultantContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddConsultantContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConsultantContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
