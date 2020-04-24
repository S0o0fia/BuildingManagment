import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyroleComponent } from './modifyrole.component';

describe('ModifyroleComponent', () => {
  let component: ModifyroleComponent;
  let fixture: ComponentFixture<ModifyroleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyroleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
