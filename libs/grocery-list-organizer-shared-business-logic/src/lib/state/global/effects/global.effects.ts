import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
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
}
