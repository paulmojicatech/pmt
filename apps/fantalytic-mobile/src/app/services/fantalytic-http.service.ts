/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Defense, QB, RB, Receivers, FANTALYTIC_API_URL } from '../../../../../libs/fantalytic-shared/src';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FantalyticHttpService {


  constructor(private _httpClient: HttpClient) { }

  getQBs(): Observable<QB[]> {
    return this._httpClient.get<{qbs: QB[]}>(`${FANTALYTIC_API_URL}qb`).pipe(
      map(qbResp => {
        return qbResp.qbs;
      }),
      catchError(err => throwError(() => new Error(`${err}`)))
    );
  }

  getRBs(): Observable<RB[]> {
    return this._httpClient.get<{rbs: RB[]}>(`${FANTALYTIC_API_URL}rb`).pipe(
      map(rbResp => {
        return rbResp.rbs;
      }),
      catchError(err => throwError(() => new Error(`${err}`)))
    );
  }

  getReceviers(): Observable<Receivers[]> {
    return this._httpClient.get<{receivers: Receivers[]}>(`${FANTALYTIC_API_URL}wr_te`).pipe(
      map(recResp => {
        return recResp.receivers;
      }),
      catchError(err => throwError(() => new Error(`${err}`)))
    );
  }

  getDefenses(): Observable<Defense[]> {
    return this._httpClient.get<{defenses: Defense[]}>(`${FANTALYTIC_API_URL}defense`).pipe(
      map(defenseResp => {
        return defenseResp.defenses;
      }),
      catchError(err => throwError(() => new Error(`${err}`)))
    );
  }
}
