import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { RegisterProfileHttpRequest } from '../models/register.interface';

@Injectable({ providedIn: 'root' })
export class AuthHttpService {
  constructor(private _httpClient: HttpClient) {}

  registerUser(
    req: RegisterProfileHttpRequest,
    url: string
  ): Observable<boolean> {
    return this._httpClient.post(url, req).pipe(
      map(() => true),
      catchError((err) => throwError(() => new Error(`${err}`)))
    );
  }
}
