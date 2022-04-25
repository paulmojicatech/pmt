import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, map, Observable, take, throwError } from 'rxjs';
import {
  getGlobalState,
  IonicStorageService,
  IonicStorageType,
} from '@pmt/grocery-list-organizer-shared-business-logic';
import { ProfileState } from './reducer/profile.reducer';
import { AuthHttpService } from './services/auth-http.service';
import {
  Profile,
  RegisterProfileHttpRequest,
} from './models/register.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileUtilService {
  constructor(
    private _store: Store<ProfileState>,
    private _authHttpSvc: AuthHttpService,
    private _storageSvc: IonicStorageService
  ) {}

  getIsAccountLinked(): Observable<boolean> {
    return this._store.select(getGlobalState).pipe(
      map((globalState) => {
        return globalState.isAccountLinked;
      }),
      take(1)
    );
  }

  registerUser(
    req: RegisterProfileHttpRequest,
    url: string
  ): Observable<boolean> {
    return this._authHttpSvc.registerUser(req, url).pipe(
      map(() => true),
      catchError((err) => throwError(() => new Error(`${err}`)))
    );
  }

  getLinkedAccount(): Observable<Profile> {
    return this._storageSvc
      .getItem(IonicStorageType.LINKED_ACCOUNT)
      .pipe(map((profileStr) => JSON.parse(profileStr)));
  }
}
