import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Topic } from '../../../../../../libs/fantalytic-shared/src/index';
import { EspnRssFeedService } from './espn-rss-feed.service';

@Injectable({
  providedIn: 'root'
})
export class PffRssFeedService extends EspnRssFeedService {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  protected override RSS_URL = 'https://pfffantasy.libsyn.com/rss';

  constructor(protected override _http: HttpClient) {
    super(_http);
   }

   protected override parseRssItemResponse(item: Element): Topic {
    const title = item.getElementsByTagName('title')[0].textContent ?? '';
    const description = item.getElementsByTagName('description')[0].firstChild?.textContent?.replace('<p>', '').replace('</p>', '') ?? '';
    const link = item.getElementsByTagName('link')[0].firstChild?.textContent ?? '';
    const publishedDate = item.getElementsByTagName('pubDate')[0].textContent ?? '';
    const topic = {title, description, publishedDate,  link};
    return topic;
  }
}
