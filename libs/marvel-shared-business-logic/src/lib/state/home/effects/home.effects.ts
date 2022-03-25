import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs';
import { CharactersUtilService } from '../../../services/util/characters-util.service';
import { routeToHome } from '../actions/home.actions';

@Injectable()
export class HomeEffects {
  constructor(
    private _actions$: Actions,
    private _charactersUtilSvc: CharactersUtilService
  ) {}

  loadRecommendations$ = createEffect(() =>
    this._actions$.pipe(
      ofType(routeToHome),
      switchMap(() => this._charactersUtilSvc.getCharactersFromStore())
    )
  );
}
