import { TestBed } from '@angular/core/testing';

import { BusinfoService } from './businfo.service';

describe('BusinfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinfoService = TestBed.get(BusinfoService);
    expect(service).toBeTruthy();
  });
});
