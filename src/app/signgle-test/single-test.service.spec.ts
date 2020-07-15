import { TestBed } from '@angular/core/testing';

import { SingleTestService } from './single-test.service';

describe('SingleTestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SingleTestService = TestBed.get(SingleTestService);
    expect(service).toBeTruthy();
  });
});
