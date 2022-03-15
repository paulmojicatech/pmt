import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { getIsInitiallyLoaded } from './index';
import { ItemsToGetState } from './models/items-to-get-state.interface';

@Injectable({
  providedIn: 'root',
})
export class ItemsToGetUtilService {
  constructor(private _store: Store<ItemsToGetState>) {}

  getIsItemsToGetStateIniitiallyLoaded(): Observable<boolean> {
    return this._store.select(getIsInitiallyLoaded).pipe(take(1));
  }
}
