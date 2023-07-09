import { TestBed } from '@angular/core/testing';

import { FootballersRssService } from './footballers-rss.service';

describe('FootballersRssService', () => {
  let service: FootballersRssService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FootballersRssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
