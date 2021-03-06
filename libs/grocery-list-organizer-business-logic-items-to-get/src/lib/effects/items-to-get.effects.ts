import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, switchMap, tap } from 'rxjs';
import { ItemsToGetUtilService } from '../items-to-get-util.service';
import {
  IonicStorageService,
  GroceryItem,
  IonicStorageType,
  AvailableGroceryItem,
  CurrentGroceryItem,
} from '@pmt/grocery-list-organizer-shared-business-logic';
import {
  addItemToAllAvailableItems,
  addItemToGet,
  loadAllAvailableItems,
  loadItemsToGet,
  loadItemsToGetSucccess,
  removeItemToGet,
} from '../actions/items-to-get.actions';
import { addItemToCurrentList } from '@pmt/grocery-list-organizer-business-logic-current-grocery-items';

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

  loadAllAvailableItems$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadItemsToGet),
      switchMap(() =>
        this._storageSvc.getItem(IonicStorageType.AVAILABLE_ITEMS).pipe(
          map((itemsString) => {
            const allAvailableItems: AvailableGroceryItem[] =
              JSON.parse(itemsString);
            return loadAllAvailableItems({ allAvailableItems });
          })
        )
      )
    )
  );

  addItemToGetAddToStorage$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(addItemToGet),
        switchMap((action) =>
          this._storageSvc.getItem(IonicStorageType.ITEMS_TO_GET).pipe(
            map((currentItems) => {
              const itemsToGet =
                JSON.parse(currentItems)?.length > 0
                  ? JSON.parse(currentItems)
                  : [];
              return { itemsToGet, action };
            })
          )
        ),
        tap((newStream) => {
          const { itemsToGet, action } = newStream;
          const updatedItems = [...itemsToGet, action.item];
          this._storageSvc.setItem(
            IonicStorageType.ITEMS_TO_GET,
            JSON.stringify(updatedItems)
          );
        })
      ),
    { dispatch: false }
  );

  addItemToGetAddToAllAvailableItems$ = createEffect(() =>
    this._actions$.pipe(
      ofType(addItemToGet),
      switchMap((action) =>
        this._itemsToGetUtilSvc.isItemToAddInAllAvailableList(action.item).pipe(
          map((isAvailable) => {
            return { item: action.item, isAvailable };
          })
        )
      ),
      filter((newStream) => !newStream.isAvailable),
      map((newStream) =>
        addItemToAllAvailableItems({ itemToAdd: newStream.item })
      )
    )
  );
  addItemToAllAvailableItemsUpdateStorage$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(addItemToAllAvailableItems),
        switchMap((action) =>
          this._storageSvc.getItem(IonicStorageType.AVAILABLE_ITEMS).pipe(
            tap((allItemsStr) => {
              const allItems = [...JSON.parse(allItemsStr), action.itemToAdd];
              this._storageSvc.setItem(
                IonicStorageType.AVAILABLE_ITEMS,
                JSON.stringify(allItems)
              );
            })
          )
        )
      ),
    { dispatch: false }
  );
  removeItemFromItemsToGetUpdateStorage$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(removeItemToGet),
        switchMap((action) =>
          this._storageSvc.getItem(IonicStorageType.ITEMS_TO_GET).pipe(
            tap((itemsStr) => {
              const itemsToGet = (
                JSON.parse(itemsStr) as CurrentGroceryItem[]
              ).filter((item) => item.name !== action.itemToRemove.name);
              this._storageSvc.setItem(
                IonicStorageType.ITEMS_TO_GET,
                JSON.stringify(itemsToGet)
              );
            })
          )
        )
      ),
    { dispatch: false }
  );
  removeItemFromItemsToGetAddItemToCurrentList$ = createEffect(() =>
    this._actions$.pipe(
      ofType(removeItemToGet),
      map((action) => {
        const itemToAdd: CurrentGroceryItem = {
          ...action.itemToRemove,
          id: `${new Date()}_${action.itemToRemove.name}`,
          datePurchased: new Date().toDateString(),
        };
        return addItemToCurrentList({ itemToAdd });
      })
    )
  );
}
