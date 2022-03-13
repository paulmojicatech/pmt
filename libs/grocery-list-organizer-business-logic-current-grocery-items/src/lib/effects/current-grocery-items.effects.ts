import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { CurrentGroceryItemsUtilService } from '../../../services/current-grocery-items/current-grocery-items-util.service';
import {
  loadCurrentItems,
  loadCurrentItemsSuccess,
} from '../actions/current-grocery-items.actions';
@Injectable()
export class CurrentGroceryItemsEffects {
  constructor(
    private _actions$: Actions,
    private _currentItemsUtilSvc: CurrentGroceryItemsUtilService
  ) {}

  loadCurrentItems$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadCurrentItems),
      switchMap(() =>
        this._currentItemsUtilSvc
          .getCurrentItemsForStore()
          .pipe(
            map((currentItems) => loadCurrentItemsSuccess({ currentItems }))
          )
      )
    )
  );
}
