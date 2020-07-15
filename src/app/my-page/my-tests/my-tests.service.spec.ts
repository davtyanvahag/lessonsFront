import { TestBed } from '@angular/core/testing';

import { MyTestsService } from './my-tests.service';

describe('MyTestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyTestsService = TestBed.get(MyTestsService);
    expect(service).toBeTruthy();
  });
});
