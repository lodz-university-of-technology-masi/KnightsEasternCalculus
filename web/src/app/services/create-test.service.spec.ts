import { TestBed } from '@angular/core/testing';
import { CreateTestService } from './create-test.service';

describe('CreateTestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateTestService = TestBed.get(CreateTestService);
    expect(service).toBeTruthy();
  });
});
