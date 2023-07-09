import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Topic } from '../models/topics.interface';
import { EspnRssFeedService } from './espn-rss-feed.service';

@Injectable({
  providedIn: 'root',
})
export class FfaRssFeedService extends EspnRssFeedService {
  protected override RSS_URL = 'https://fantasyfootballanalytics.net/feed';

  constructor(protected override _http: HttpClient) {
    super(_http);
  }

  protected override parseRssItemResponse(item: Element): Topic {
    
  }
}
