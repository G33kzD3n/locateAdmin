import { TestBed } from '@angular/core/testing';

import { DeleteBusService } from './delete-bus.service';

describe('DeleteBusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeleteBusService = TestBed.get(DeleteBusService);
    expect(service).toBeTruthy();
  });
});
