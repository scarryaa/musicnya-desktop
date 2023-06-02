import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { artistDetailsGuard } from './artist-details.guard';

describe('artistDetailsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => artistDetailsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
