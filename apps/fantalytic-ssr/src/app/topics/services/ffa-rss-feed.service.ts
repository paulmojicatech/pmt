import { Injectable } from '@angular/core';
import { Topic, parseFFARSSFeed } from '@pmt/fantalytic-shared-v2';
import { EspnRssFeedService } from './espn-rss-feed.service';

@Injectable({
  providedIn: 'root'
})
export class FfaRssFeedService extends EspnRssFeedService {

  protected override RSS_URL = `https://fantasyfootballanalytics.net/feed`;

  constructor() {
    super();
  }

   protected override parseRssReponse(resp: any): Topic[] {
      return parseFFARSSFeed(resp);
   }
}
