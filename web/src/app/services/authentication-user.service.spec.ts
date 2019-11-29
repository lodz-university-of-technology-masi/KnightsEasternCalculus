import { TestBed } from '@angular/core/testing';

import { AuthenticationUserService } from './authentication-user.service';

describe('AuthenticationUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticationUserService = TestBed.get(AuthenticationUserService);
    expect(service).toBeTruthy();
  });
});
