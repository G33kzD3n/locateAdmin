import { TestBed } from '@angular/core/testing';

import { EditBusService } from './edit-bus.service';

describe('EditBusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditBusService = TestBed.get(EditBusService);
    expect(service).toBeTruthy();
  });
});
