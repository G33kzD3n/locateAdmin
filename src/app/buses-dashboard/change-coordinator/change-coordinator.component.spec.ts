import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCoordinatorComponent } from './change-coordinator.component';

describe('ChangeCoordinatorComponent', () => {
  let component: ChangeCoordinatorComponent;
  let fixture: ComponentFixture<ChangeCoordinatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeCoordinatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
