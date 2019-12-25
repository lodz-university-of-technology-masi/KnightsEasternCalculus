import { TestBed } from '@angular/core/testing';

import { ShowAllTestService } from './show-all-test.service';

describe('ShowAllTestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowAllTestService = TestBed.get(ShowAllTestService);
    expect(service).toBeTruthy();
  });
});
