import { TestBed } from '@angular/core/testing';

import { MarvelHttpService } from './marvel-http.service';

describe('MarvelHttpService', () => {
  let service: MarvelHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarvelHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
