import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectTableComponent } from './collect-table.component';

describe('CollectTableComponent', () => {
  let component: CollectTableComponent;
  let fixture: ComponentFixture<CollectTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
