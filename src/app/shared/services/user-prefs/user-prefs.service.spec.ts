import { TestBed } from '@angular/core/testing';

import { UserPrefsService } from './user-prefs.service';

describe('UserPrefsService', () => {
  let service: UserPrefsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPrefsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
