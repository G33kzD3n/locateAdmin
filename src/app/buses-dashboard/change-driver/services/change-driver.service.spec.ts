import { TestBed } from '@angular/core/testing';

import { ChangeDriverService } from './change-driver.service';

describe('ChangeDriverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangeDriverService = TestBed.get(ChangeDriverService);
    expect(service).toBeTruthy();
  });
});
