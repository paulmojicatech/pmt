import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EspnRssFeedService } from './espn-rss-feed.service';

@Injectable({
  providedIn: 'root',
})
export class RazzballRssFeedService extends EspnRssFeedService {
  protected override RSS_URL = `https://football.razzball.com/feed`;

  constructor(protected _httpClient: HttpClient) {
    super(_httpClient);
  }

}
