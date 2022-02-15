import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, from, iif, map, Observable, of, switchMap } from 'rxjs';
import { getCurrentItems } from '../../state/current-grocery-items';
import { CurrentGroceryItemsState } from '../../state/current-grocery-items/reducer/current-grocery-items.reducer';
import { IonicStorageService } from '../storage/ionic-storage.service';
import {
  CurrentGroceryItem,
  IonicStorageType,
} from '../storage/models/storage.interface';

@Injectable({
  providedIn: 'root',
})
export class CurrentGroceryItemsUtilService {
  constructor(
    private _store: Store<CurrentGroceryItemsState>,
    private _storageSvc: IonicStorageService
  ) {}

  getCurrentItemsFromStore(): Observable<CurrentGroceryItem[]> {
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
