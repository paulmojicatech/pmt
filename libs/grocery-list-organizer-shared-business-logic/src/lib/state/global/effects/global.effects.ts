import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, switchMap, tap } from 'rxjs';
import { IonicStorageService } from '../../../services/storage/ionic-storage.service';
import { IonicStorageType } from '../../../services/storage/models/storage.interface';
import { initializeApp, setIsAccountLinked } from '../actions/global.actions';

@Injectable()
export class GlobalEffects {
  constructor(
    private _actions$: Actions,
    private _storage: IonicStorageService
  ) {}

  initializeApp$ = createEffect(() =>
    this._actions$.pipe(
      ofType(initializeApp),
      switchMap(() => this._storage.getItem(IonicStorageType.LINKED_ACCOUNT)),
      map((isLinked) => setIsAccountLinked({ isAccountLinked: !!isLinked }))
    )
  );

  preloadDeviceWithItems$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(initializeApp),
        switchMap(() =>
          this._storage.getItem(IonicStorageType.AVAILABLE_ITEMS)
        ),
        filter((itemString) => !itemString),
        tap(() => this._storage.preloadDevice())
      ),
    { dispatch: false }
  );
}
