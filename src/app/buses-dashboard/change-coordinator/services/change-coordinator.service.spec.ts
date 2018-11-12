import { TestBed } from '@angular/core/testing';

import { ChangeCoordinatorService } from './change-coordinator.service';

describe('ChangeCoordinatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangeCoordinatorService = TestBed.get(ChangeCoordinatorService);
    expect(service).toBeTruthy();
  });
});
