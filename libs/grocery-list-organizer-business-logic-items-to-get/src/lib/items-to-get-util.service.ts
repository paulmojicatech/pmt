import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AvailableGroceryItem } from '@pmt/grocery-list-organizer-shared-business-logic';
import { map, Observable, take } from 'rxjs';
import { getAllAvailableItems, getIsInitiallyLoaded } from './index';
import { ItemsToGetState } from './models/items-to-get-state.interface';

@Injectable({
  providedIn: 'root',
})
export class ItemsToGetUtilService {
  constructor(private _store: Store<ItemsToGetState>) {}

  getIsItemsToGetStateIniitiallyLoaded(): Observable<boolean> {
    return this._store.select(getIsInitiallyLoaded).pipe(take(1));
  }

  isItemToAddInAllAvailableList(
    itemToAdd: AvailableGroceryItem
  ): Observable<boolean> {
    return this._store.select(getAllAvailableItems).pipe(
      map((allItems) => {
        return allItems.findIndex((item) => item.name === itemToAdd.name) > -1;
      })
    );
  }
}
