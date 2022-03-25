import { TestBed } from '@angular/core/testing';

import { HasherService } from './hasher.service';

describe('HasherService', () => {
  let service: HasherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HasherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
