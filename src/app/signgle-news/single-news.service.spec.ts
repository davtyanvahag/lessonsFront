import { TestBed } from '@angular/core/testing';

import { SingleNewsService } from './single-news.service';

describe('SingleNewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SingleNewsService = TestBed.get(SingleNewsService);
    expect(service).toBeTruthy();
  });
});
