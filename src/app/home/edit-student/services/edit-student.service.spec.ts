import { TestBed } from '@angular/core/testing';

import { EditStudentService } from './edit-student.service';

describe('EditStudentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditStudentService = TestBed.get(EditStudentService);
    expect(service).toBeTruthy();
  });
});
