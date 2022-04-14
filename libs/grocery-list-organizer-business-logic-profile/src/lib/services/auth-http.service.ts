import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { RegisterProfileHttpRequest } from '../models/register.interface';

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
  }
}
