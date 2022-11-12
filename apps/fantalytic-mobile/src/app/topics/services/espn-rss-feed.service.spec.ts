import { TestBed } from '@angular/core/testing';

import { EspnRssFeedService } from './espn-rss-feed.service';

describe('EspnRssFeedService', () => {
  let service: EspnRssFeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspnRssFeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
