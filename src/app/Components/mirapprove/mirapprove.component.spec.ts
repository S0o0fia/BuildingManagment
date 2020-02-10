import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MirapproveComponent } from './mirapprove.component';

describe('MirapproveComponent', () => {
  let component: MirapproveComponent;
  let fixture: ComponentFixture<MirapproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MirapproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MirapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
