import { TestBed } from '@angular/core/testing';

import { FantalyticHttpService } from './fantalytic-http.service';

describe('FantalyticHttpService', () => {
  let service: FantalyticHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FantalyticHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
