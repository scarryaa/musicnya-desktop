import { TestBed } from '@angular/core/testing';

import { ColorFadeService } from './color-fade.service';

describe('ColorFadeService', () => {
  let service: ColorFadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorFadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
