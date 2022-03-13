import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, switchMap } from 'rxjs';
import { ItemsToGetUtilService } from '../items-to-get-util.service';
import {
  IonicStorageService,
  GroceryItem,
  IonicStorageType,
} from '@pmt/grocery-list-organizer-shared-business-logic';
import {
  loadItemsToGet,
  loadItemsToGetSucccess,
} from '../actions/items-to-get.actions';

@Injectable()
export class ItemsToGetEffects {
  constructor(
    private _actions$: Actions,
    private _storageSvc: IonicStorageService,
    private _itemsToGetUtilSvc: ItemsToGetUtilService
  ) {}

  loadItemsToGet$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadItemsToGet),
      switchMap(() =>
        this._itemsToGetUtilSvc.getIsItemsToGetStateIniitiallyLoaded()
      ),
      filter((isInitiallyLoaded) => !isInitiallyLoaded),
      switchMap(() =>
        this._storageSvc.getItem(IonicStorageType.ITEMS_TO_GET).pipe(
          map((itemsStr) => {
            return JSON.parse(itemsStr) as GroceryItem[];
          })
        )
      ),
      map((items) => loadItemsToGetSucccess({ items }))
    )
  );
}
