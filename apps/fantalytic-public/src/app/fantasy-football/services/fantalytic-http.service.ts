import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Defense, QB, RB, Receivers } from '@pmt/fantalytic-shared';
import { catchError, map, Observable, throwError } from 'rxjs';
import { FANTALYTIC_API_URL } from '../../const/urls.const';

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
        const rbMap = new Map<string, RB>();
        rbResp.rbs.forEach(rb => rbMap.set(rb.player, rb));
        return [...rbMap.values()];
      }),
      catchError(err => throwError(() => new Error(`${err}`)))
    );
  }

  getReceviers(): Observable<Receivers[]> {
    return this._httpClient.get<{receivers: Receivers[]}>(`${FANTALYTIC_API_URL}wr_te`).pipe(
      map(recResp => {
        const recMap = new Map<string, Receivers>();
        recResp.receivers.forEach(rec => recMap.set(rec.player, rec));
        return [...recMap.values()];
      }),
      catchError(err => throwError(() => new Error(`${err}`)))
    );
  }

  getDefenses(): Observable<Defense[]> {
    return this._httpClient.get<{defenses: Defense[]}>(`${FANTALYTIC_API_URL}defense`).pipe(
      map(defenseResp => {
        const defMap = new Map<string, Defense>();
        defenseResp.defenses.forEach(def => defMap.set(def.team, def));
        return [...defMap.values()];
      }),
      catchError(err => throwError(() => new Error(`${err}`)))
    );
  }
}
