/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Defense, QB, RB, Receivers, FANTALYTIC_API_URL } from '../../../../../libs/fantalytic-shared/src';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FantalyticHttpService {

  private _URL: string;

  constructor(private _httpClient: HttpClient, platform: Platform) {
    if (platform.is('android') || platform.is('ios')) {
      this._URL = 'https://api.fantalytic.io/api/';
    } else {
      this._URL = FANTALYTIC_API_URL;
    }
   }

  getQBs(): Observable<QB[]> {
    return this._httpClient.get<{qbs: QB[]}>(`${this._URL}qb`).pipe(
      map(qbResp => {
        return qbResp.qbs;
      }),
      catchError(err => throwError(() => new Error(`${err}`)))
    );
  }

  getRBs(): Observable<RB[]> {
    return this._httpClient.get<{rbs: RB[]}>(`${this._URL}rb`).pipe(
      map(rbResp => {
        return rbResp.rbs;
      }),
      catchError(err => throwError(() => new Error(`${err}`)))
    );
  }

  getReceviers(): Observable<Receivers[]> {
    return this._httpClient.get<{receivers: Receivers[]}>(`${this._URL}wr_te`).pipe(
      map(recResp => {
        return recResp.receivers;
      }),
      catchError(err => throwError(() => new Error(`${err}`)))
    );
  }

  getDefenses(): Observable<Defense[]> {
    return this._httpClient.get<{defenses: Defense[]}>(`${this._URL}defense`).pipe(
      map(defenseResp => {
        return defenseResp.defenses;
      }),
      catchError(err => throwError(() => new Error(`${err}`)))
    );
  }
}
