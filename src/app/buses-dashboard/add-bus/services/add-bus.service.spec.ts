import { TestBed } from '@angular/core/testing';

import { AddBusService } from './add-bus.service';

describe('AddBusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddBusService = TestBed.get(AddBusService);
    expect(service).toBeTruthy();
  });
});
