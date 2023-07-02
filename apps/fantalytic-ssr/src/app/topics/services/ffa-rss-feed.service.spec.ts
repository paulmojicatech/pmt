import { TestBed } from '@angular/core/testing';

import { FfaRssFeedService } from './ffa-rss-feed.service';

describe('FfaRssFeedService', () => {
  let service: FfaRssFeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FfaRssFeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
