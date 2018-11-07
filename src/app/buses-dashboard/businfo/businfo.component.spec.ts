import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinfoComponent } from './businfo.component';

describe('BusinfoComponent', () => {
  let component: BusinfoComponent;
  let fixture: ComponentFixture<BusinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
