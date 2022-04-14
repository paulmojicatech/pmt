import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, switchMap, tap } from 'rxjs';
import { ProfileUtilService } from '../profile-util.service';
import {
  registerProfile,
  registerProfileFail,
  registerProfileSuccess,
  routeToProfileModule,
} from '../actions/profile.actions';
import {
  showToastMessage,
  toggleSpinner,
} from '@pmt/grocery-list-organizer-shared-business-logic';

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
        switchMap(() => this._profileUtilSvc.getIsAccountLinked()),
        filter((isLinked) => !isLinked),
        tap(() => {
          this._router.navigate(['tabs', 'profile', 'login']);
        })
      ),
    { dispatch: false }
  );

  registerProfile$ = createEffect(() =>
    this._actions$.pipe(
      ofType(registerProfile),
      switchMap((action) =>
        this._profileUtilSvc.registerUser(action.req, action.url).pipe(
          map(() => registerProfileSuccess()),
          catchError((err) => [registerProfileFail({ errorMsg: err })])
        )
      )
    )
  );

  registerProfileShowSpinner$ = createEffect(() =>
    this._actions$.pipe(
      ofType(registerProfile),
      map(() => toggleSpinner({ isShowSpinner: true }))
    )
  );

  registerProfileToastSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(registerProfileSuccess),
      map(() =>
        showToastMessage({
          isError: false,
          message: 'Your profile is now registered.',
        })
      )
    )
  );

  registerProfileHideSpinnerSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(registerProfileSuccess),
      map(() => toggleSpinner({ isShowSpinner: false }))
    )
  );

  registerProfileToastFail$ = createEffect(() =>
    this._actions$.pipe(
      ofType(registerProfileFail),
      map(() =>
        showToastMessage({
          isError: true,
          message: 'There was an error registering your profile.',
        })
      )
    )
  );

  registerProfileHideSpinnerFail$ = createEffect(() =>
    this._actions$.pipe(
      ofType(registerProfileFail),
      map(() => toggleSpinner({ isShowSpinner: false }))
    )
  );
}
