import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QB } from '@pmt/fantalytic-shared';
import { catchError, map, Observable, throwError } from 'rxjs';
import { FANTALYTIC_API_URL } from '../../const/urls.const';

@Injectable({
  providedIn: 'root'
})
export class FantalyticHttpService {


  constructor(private _httpClient: HttpClient) { }

  getQBss(): Observable<QB[]> {
    return this._httpClient.get<{qbs: QB[]}>(`${FANTALYTIC_API_URL}qb`).pipe(
      map(qbResp => qbResp.qbs),
      catchError(err => throwError(() => new Error(`${err}`)))
    );
  }
}
