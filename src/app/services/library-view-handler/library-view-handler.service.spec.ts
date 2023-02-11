import { TestBed } from '@angular/core/testing';

import { LibraryViewHandlerService } from './library-view-handler.service';

describe('LibraryViewHandlerService', () => {
  let service: LibraryViewHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibraryViewHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
