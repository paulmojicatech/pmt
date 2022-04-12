import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  interval,
  map,
  Observable,
  of,
  take,
  throwError,
} from 'rxjs';
import { RegisterProfileHttpRequest } from '../models/register.interface';

@Injectable({ providedIn: 'root' })
export class AuthHttpService {
  constructor(private _httpClient: HttpClient) {}

  registerUser(
    req: RegisterProfileHttpRequest,
    url: string
  ): Observable<boolean> {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    };
    return this._httpClient.post(url, req, { headers }).pipe(
      map(() => true),
      catchError((err) => throwError(() => new Error(`${err}`)))
    );
  }
}
