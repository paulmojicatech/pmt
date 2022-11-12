/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable no-underscore-dangle */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Topic } from '../../../../../../libs/fantalytic-shared/src/index';

@Injectable({
  providedIn: 'root'
})
export class EspnRssFeedService {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  protected RSS_URL = 'https://www.espn.com/espn/rss/news';

  constructor(protected _http: HttpClient) { }

  getTopics(): Observable<Topic[]> {
    const options = {responseType: 'text' as 'json'};
    return this._http.get<any>(this.RSS_URL, options).pipe(
      map(resp => {
       const parser = new DOMParser();
       const doc = parser.parseFromString(resp, 'application/xml');
       const items = doc.getElementsByTagName('item');
       let topics: Topic[] = [];
       for (let i = 0; i < items.length; i++) {
        const topic = this.parseRssItemResponse(items[i]);
        topics = [...topics, topic];
       }
       // console.log('DOC', doc);
       return topics;
      })
    );
  }

  protected parseRssItemResponse(item: Element): Topic {
    const title = item.getElementsByTagName('title')[0].textContent ?? '';
    const description = item.getElementsByTagName('description')[0].firstChild?.textContent ?? '';
    const imageUrl = item.getElementsByTagName('enclosure')[0]?.getAttribute('url') ?? '';
    const link = item.getElementsByTagName('link')[0].firstChild?.textContent ?? '';
    const publishedDate = item.getElementsByTagName('pubDate')[0].textContent ?? '';
    const topic = {title, description, publishedDate, imageUrl,  link};
    return topic;
  }
}
