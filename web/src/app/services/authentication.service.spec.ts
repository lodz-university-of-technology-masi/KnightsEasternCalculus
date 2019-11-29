import { TestBed } from '@angular/core/testing';

import { AuthenticationRecruiterService } from './authentication-recruiter.service';

describe('AuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticationRecruiterService = TestBed.get(AuthenticationRecruiterService);
    expect(service).toBeTruthy();
  });
});
