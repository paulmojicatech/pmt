import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Topic } from '../models/topics.interface';

@Injectable({
  providedIn: 'root'
})
export class EspnRssFeedService {

  private readonly ESPN_RSS_URL = `https://www.espn.com/espn/rss/news`;

  constructor(private _http: HttpClient) { }

  getTopics(): Observable<Topic[]> {
    const options = {responseType: 'text' as 'json'};
    return this._http.get<any>(this.ESPN_RSS_URL, options).pipe(
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
    )
  }

  private parseRssItemResponse(item: Element): Topic {
    const title = item.getElementsByTagName('title')[0].textContent ?? '';
    const description = item.getElementsByTagName('description')[0].firstChild?.textContent ?? '';
    const imageUrl = item.getElementsByTagName('enclosure')[0]?.getAttribute('url') ?? '';
    const link = item.getElementsByTagName('link')[0].firstChild?.textContent ?? '';
    const publishedDate = item.getElementsByTagName('pubDate')[0].textContent ?? '';
    const topic = {title, description, publishedDate, imageUrl,  link};
    return topic;
  }
}