import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Topic, parseESPNRSSFeed } from '@pmt/fantalytic-shared-v2';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspnRssFeedService {

  protected RSS_URL = `https://www.espn.com/espn/rss/news`;

  protected _http = inject(HttpClient);

  getTopics(): Observable<Topic[]> {
    const options = {responseType: 'text' as 'json'};
    return this._http.get<any>(this.RSS_URL, options).pipe(
      map(resp => {
        return this.parseRssReponse(resp);
      }),
      catchError(err => {
        console.error('ERROR', err);
        return throwError(() => err);
      })
    )
  }

  protected parseRssReponse(resp: any): Topic[] {
    return parseESPNRSSFeed(resp);
  }

}
