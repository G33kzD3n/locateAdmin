import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusesDashboardComponent } from './buses-dashboard.component';

describe('BusesDashboardComponent', () => {
  let component: BusesDashboardComponent;
  let fixture: ComponentFixture<BusesDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusesDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
