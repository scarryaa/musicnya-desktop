import { TestBed } from '@angular/core/testing';

import { MusickitAPIService } from './musickit-api.service';

describe('MusickitAPIService', () => {
  let service: MusickitAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusickitAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
