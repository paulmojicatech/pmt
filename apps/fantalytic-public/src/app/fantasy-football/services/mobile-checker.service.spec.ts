import { TestBed } from '@angular/core/testing';

import { MobileCheckerService } from './mobile-checker.service';

describe('MobileCheckerService', () => {
  let service: MobileCheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileCheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
