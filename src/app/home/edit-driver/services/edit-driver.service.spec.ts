import { TestBed } from '@angular/core/testing';

import { EditDriverService } from './edit-driver.service';

describe('EditDriverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditDriverService = TestBed.get(EditDriverService);
    expect(service).toBeTruthy();
  });
});
