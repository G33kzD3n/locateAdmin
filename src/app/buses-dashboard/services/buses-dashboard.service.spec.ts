import { TestBed } from '@angular/core/testing';

import { BusesDashboardService } from './buses-dashboard.service';

describe('BusesDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusesDashboardService = TestBed.get(BusesDashboardService);
    expect(service).toBeTruthy();
  });
});
