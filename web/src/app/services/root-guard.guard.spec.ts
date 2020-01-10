import { TestBed, async, inject } from '@angular/core/testing';

import { RootGuard } from './root-guard.service';

describe('RootGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RootGuard]
    });
  });

  it('should ...', inject([RootGuard], (guard: RootGuard) => {
    expect(guard).toBeTruthy();
  }));
});
