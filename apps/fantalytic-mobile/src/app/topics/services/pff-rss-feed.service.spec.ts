import { TestBed } from '@angular/core/testing';

import { PffRssFeedService } from './pff-rss-feed.service';

describe('PffRssFeedService', () => {
  let service: PffRssFeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PffRssFeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
