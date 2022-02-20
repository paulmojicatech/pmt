import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { getGlobalState } from '../../state/global/index';
import { ProfileState } from '../../state/profile/reducer/profile.reducer';

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
