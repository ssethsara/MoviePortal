import { TestBed } from '@angular/core/testing';

import { AccountService  } from './account-service.service';

describe('LoginServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountService  = TestBed.get(AccountService );
    expect(service).toBeTruthy();
  });
});
