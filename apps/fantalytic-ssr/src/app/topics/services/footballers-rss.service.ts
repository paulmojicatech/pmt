import { Injectable } from '@angular/core';
import { EspnRssFeedService } from './espn-rss-feed.service';
import { Topic, parseFootballersRSSFeed } from '@pmt/fantalytic-shared-v2';

@Injectable({
  providedIn: 'root'
})
export class FootballersRssService extends EspnRssFeedService {

  protected override RSS_URL = 'https://thefantasyfootballers.libsyn.com/fantasyfootball';

  constructor() {
    super();
  }

  protected override parseRssReponse(resp: any): Topic[] {
    return parseFootballersRSSFeed(resp);
 }
  

}
