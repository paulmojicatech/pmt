import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, switchMap, tap } from 'rxjs';
import { ProfileUtilService } from '../profile-util.service';
import { routeToProfileModule } from '../actions/profile.actions';

@Injectable()
export class ProfileEffects {
  constructor(
    private _actions$: Actions,
    private _profileUtilSvc: ProfileUtilService,
    private _router: Router
  ) {}

  routeToProfileModule$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(routeToProfileModule),
        switchMap(() =>
          this._profileUtilSvc.getIsAccountLinked().pipe(
            tap((isLinked) => {
              console.log(isLinked);
            })
          )
        ),
        filter((isLinked) => !isLinked),
        tap(() => {
          this._router.navigate(['tabs', 'profile', 'login']);
        })
      ),
    { dispatch: false }
  );
}
