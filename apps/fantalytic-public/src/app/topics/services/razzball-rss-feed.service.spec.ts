import { TestBed } from '@angular/core/testing';

import { RazzballRssFeedService } from './razzball-rss-feed.service';

describe('RazzballRssFeedService', () => {
  let service: RazzballRssFeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RazzballRssFeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
