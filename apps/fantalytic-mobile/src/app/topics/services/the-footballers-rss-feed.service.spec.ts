import { TestBed } from '@angular/core/testing';

import { TheFootballersRssFeedService } from './the-footballers-rss-feed.service';

describe('TheFootballersRssFeedService', () => {
  let service: TheFootballersRssFeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TheFootballersRssFeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
