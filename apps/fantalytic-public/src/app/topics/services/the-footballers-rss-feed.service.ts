import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Topic } from '@pmt/fantalytic-shared';
import { EspnRssFeedService } from './espn-rss-feed.service';

@Injectable({
  providedIn: 'root'
})
export class TheFootballersRssFeedService extends EspnRssFeedService {

  protected override RSS_URL = 'https://thefantasyfootballers.libsyn.com/fantasyfootball';

  constructor(protected override _http: HttpClient) {
    super(_http);
   }

  protected override parseRssItemResponse(item: Element): Topic {
    const title = item.getElementsByTagName('title')[0].textContent ?? '';
    const description = item.getElementsByTagName('description')[0].firstChild?.textContent ?? '';
    const link = item.getElementsByTagName('link')[0].firstChild?.textContent ?? '';
    const publishedDate = item.getElementsByTagName('pubDate')[0].textContent ?? '';
    const topic = {title, description, publishedDate,  link};
    return topic;
  }
}
