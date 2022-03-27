import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CurrentGroceryItem,
  IonicStorageService,
  IonicStorageType,
} from '@pmt/grocery-list-organizer-shared-business-logic';
import { filter, forkJoin, map, Observable, take } from 'rxjs';
import { loadCurrentItemsSuccess } from '../actions/current-grocery-items.actions';
import { CurrentListState } from '../models/current-list.interface';

@Injectable({
  providedIn: 'root',
})
export class CurrentGroceryItemsUtilService {
  constructor(
    private _store: Store<CurrentListState>,
    private _storageSvc: IonicStorageService
  ) {}

  loadItemsFromStorage(): void {
    this._storageSvc
      .getItem(IonicStorageType.CURRENT_ITEMS)
      .pipe(
        filter((itemsStr) => !!itemsStr),
        take(1)
      )
      .subscribe((itemsStr) => {
        this._store.dispatch(
          loadCurrentItemsSuccess({ currentItems: JSON.parse(itemsStr) })
        );
      });
  }

  addItemToCurrentListOnStorage(itemToAdd: CurrentGroceryItem): void {
    this._storageSvc
      .getItem(IonicStorageType.CURRENT_ITEMS)
      .pipe(take(1))
      .subscribe((itemsStr) => {
        const currentItems = itemsStr
          ? [...JSON.parse(itemsStr), itemToAdd]
          : [itemToAdd];
        this._storageSvc.setItem(
          IonicStorageType.CURRENT_ITEMS,
          JSON.stringify(currentItems)
        );
      });
  }

  updateStorageAfterItemMarkedAsUsed(usedItem: CurrentGroceryItem): void {
    const currentItems$ = this._storageSvc.getItem(
      IonicStorageType.CURRENT_ITEMS
    );
    const usedItems$ = this._storageSvc
      .getItem(IonicStorageType.COMPLETED_ITEMS)
      .pipe(
        map((usedItemsStr) => {
          if (!usedItemsStr) {
            return JSON.stringify([]);
          }
          return usedItemsStr;
        })
      );
    forkJoin([currentItems$, usedItems$]).subscribe(
      ([currentItemsStr, usedItemsStr]) => {
        const currentItems = (
          JSON.parse(currentItemsStr) as CurrentGroceryItem[]
        ).filter((item) => item.id !== usedItem.id);
        const usedItems = [
          ...(JSON.parse(usedItemsStr) as CurrentGroceryItem[]),
          usedItem,
        ];
        this._storageSvc.setItem(
          IonicStorageType.CURRENT_ITEMS,
          JSON.stringify(currentItems)
        );
        this._storageSvc.setItem(
          IonicStorageType.COMPLETED_ITEMS,
          JSON.stringify(usedItems)
        );
      }
    );
  }
}
