import { TestBed } from '@angular/core/testing';

import { MusickitHttpInterceptorInterceptor } from './musickit-http.interceptor';

describe('MusickitHttpInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MusickitHttpInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: MusickitHttpInterceptorInterceptor = TestBed.inject(MusickitHttpInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
