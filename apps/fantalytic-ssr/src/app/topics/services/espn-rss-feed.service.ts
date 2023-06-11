import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Topic, parseESPNRSSFeed } from 'libs/fantalytic-shared-v2/src';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspnRssFeedService {

  private readonly RSS_URL = `https://www.espn.com/espn/rss/news`;

  private _http = inject(HttpClient);

  getTopics(): Observable<Topic[]> {
    const options = {responseType: 'text' as 'json'};
    return this._http.get<any>(this.RSS_URL, options).pipe(
      map(resp => {
        return parseESPNRSSFeed(resp);
      }),
      catchError(err => {
        console.error('ERROR', err);
        return throwError(() => err);
      })
    )
  }

}
