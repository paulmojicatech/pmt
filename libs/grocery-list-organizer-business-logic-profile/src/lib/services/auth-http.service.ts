import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx/index';
import { catchError, from, map, Observable, throwError } from 'rxjs';
import { RegisterProfileHttpRequest } from '../models/register.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthHttpService {
  constructor(private _http: HttpClient) {}

  registerUser(
    req: RegisterProfileHttpRequest,
    url: string
  ): Observable<boolean> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    return this._http.post(url, req, { headers }).pipe(
      map(() => {
        return true;
      }),
      catchError((err) => {
        console.log('ERR', err);
        return throwError(() => new Error(`${err}`));
      })
    );

    // const headers = {
    //   'Content-Type': 'application/json',
    //   'Access-Control-Allow-Origin': '*',
    // };
    // return from(this._http.post(url, req, headers)).pipe(
    //   map(() => {
    //     console.log('TEST');
    //     return true;
    //   }),
    //   catchError((err) => {
    //     return throwError(() => new Error(`${err}`));
    //   })
    // );
  }
}
