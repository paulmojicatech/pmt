import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  IonicStorageService,
  CurrentGroceryItem,
  IonicStorageType,
} from '@pmt/grocery-list-organizer-shared-business-logic';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { getCurrentItems } from '../index';
import { CurrentListState } from '../models/current-list.interface';

@Injectable({
  providedIn: 'root',
})
export class CurrentGroceryItemsUtilService {
  constructor(
    private _store: Store<CurrentListState>,
    private _storageSvc: IonicStorageService
  ) {}

  getCurrentItemsForStore(): Observable<CurrentGroceryItem[]> {
    const items$ = this._store.select(getCurrentItems);
    const storedItems$ = from(
      this._storageSvc.getItem(IonicStorageType.CURRENT_ITEMS)
    ).pipe(
      map((items) => {
        if (items) {
          return JSON.parse(items) as CurrentGroceryItem[];
        } else {
          return [];
        }
      })
    );
    return items$.pipe(
      switchMap((items) => {
        if (items) {
          return of(items);
        } else {
          return storedItems$;
        }
      })
    );
  }
}
