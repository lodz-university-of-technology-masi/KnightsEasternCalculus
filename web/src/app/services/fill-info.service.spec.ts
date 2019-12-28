import { TestBed } from '@angular/core/testing';
import { FillInfoService } from './fill-info.service';

describe('FillInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FillInfoService = TestBed.get(FillInfoService);
    expect(service).toBeTruthy();
  });
});
