import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { initializeApp } from '@pmt/grocery-list-organizer-shared-business-logic';
import { tap } from 'rxjs';
import {
  addItemToCurrentList,
  decrementItemQty,
  markItemAsUsed,
  throwAwayItem,
} from '../actions/current-grocery-items.actions';
import { CurrentGroceryItemsUtilService } from '../services/current-grocery-items-util.service';
@Injectable()
export class CurrentGroceryItemsEffects {
  constructor(
    private _actions$: Actions,
    private _currentItemsUtilSvc: CurrentGroceryItemsUtilService
  ) {}

  initAppLoadItems$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(initializeApp),
        tap(() => this._currentItemsUtilSvc.loadItemsFromStorage())
      ),
    { dispatch: false }
  );

  addItemToCurrentListUpdateStorage$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(addItemToCurrentList),
        tap((action) => {
          this._currentItemsUtilSvc.addItemToCurrentListOnStorage(
            action.itemToAdd
          );
        })
      ),
    { dispatch: false }
  );

  markItemAsUsed$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(markItemAsUsed),
        tap((action) => {
          this._currentItemsUtilSvc.updateStorageAfterItemMarkedAsUsed(
            action.usedItem
          );
        })
      ),
    { dispatch: false }
  );

  decrementItemUpdateStorage$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(decrementItemQty),
        tap((action) => {
          this._currentItemsUtilSvc.updateStoargeAfterDecrementItem(
            action.itemToDecrement
          );
        })
      ),
    { dispatch: false }
  );

  throwAwayItem$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(throwAwayItem),
        tap((action) =>
          this._currentItemsUtilSvc.updateStorageAfterItemThrownAway(
            action.itemToThrowAway
          )
        )
      ),
    { dispatch: false }
  );
}
