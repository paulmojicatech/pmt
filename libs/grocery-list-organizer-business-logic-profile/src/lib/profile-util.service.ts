import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { getGlobalState } from '@pmt/grocery-list-organizer-shared-business-logic';
import { ProfileState } from './reducer/profile.reducer';

@Injectable({
  providedIn: 'root',
})
export class ProfileUtilService {
  constructor(private _store: Store<ProfileState>) {}

  getIsAccountLinked(): Observable<boolean> {
    return this._store.select(getGlobalState).pipe(
      map((globalState) => {
        return globalState.isAccountLinked;
      }),
      take(1)
    );
  }
}
