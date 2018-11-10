import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCordinatorComponent } from './edit-cordinator.component';

describe('EditCordinatorComponent', () => {
  let component: EditCordinatorComponent;
  let fixture: ComponentFixture<EditCordinatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCordinatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
