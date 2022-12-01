/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, filter, iif, map, switchMap, withLatestFrom } from 'rxjs';
import {
  FantasyFootballState,
  Defense,
  PositionTypes,
  QB,
  RB,
  Receivers,
} from '../../../../../../../libs/fantalytic-shared/src';
import { getFantasyFootballState } from '../selectors/fantasy-football.selectors';
import { FantalyticHttpService } from '../../../services/fantalytic-http.service';
import {
  fantasyFootballError,
  loadDefenses,
  loadDefensesSuccess,
  loadQbs,
  loadQbsSuccess,
  loadRbs,
  loadRbsSuccess,
  loadReceivers,
  loadReceiversSuccess,
  setPositionType,
} from '../actions/fantasy-football.actions';

@Injectable()
export class FantasyFootballEffects {
  constructor(
    private _actions$: Actions,
    private _fantasyHttpSvc: FantalyticHttpService,
    private _store: Store<FantasyFootballState>
  ) {}

  loadQbs$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadQbs),
      switchMap(() =>
        this._fantasyHttpSvc.getQBs().pipe(
          map((qbs) => loadQbsSuccess(qbs)),
          catchError((err) => [fantasyFootballError(err)])
        )
      )
    )
  );

  loadRbs$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadRbs),
      switchMap(() =>
        this._fantasyHttpSvc.getRBs().pipe(
          map((rbs) => loadRbsSuccess(rbs)),
          catchError((err) => [fantasyFootballError(err)])
        )
      )
    )
  );

  loadReceivers$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadReceivers),
      switchMap(() =>
        this._fantasyHttpSvc.getReceviers().pipe(
          map((receivers) => loadReceiversSuccess(receivers)),
          catchError((err) => [fantasyFootballError(err)])
        )
      )
    )
  );

  loadDefenses$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadDefenses),
      switchMap(() =>
        this._fantasyHttpSvc.getDefenses().pipe(
          map((defenses) => loadDefensesSuccess(defenses)),
          catchError((err) => [fantasyFootballError(err)])
        )
      )
    )
  );

  setPositionTypesQb$ = createEffect(() =>
    this._actions$.pipe(
      ofType(setPositionType),
      filter((action) => action.position === PositionTypes.QB),
      withLatestFrom(this._store.select(getFantasyFootballState)),
      switchMap(([, state]) =>
        iif(() => !state.qbs, [loadQbs()], [loadQbsSuccess(state.qbs as QB[])])
      )
    )
  );

  setPositionTypesRb$ = createEffect(() =>
    this._actions$.pipe(
      ofType(setPositionType),
      filter((action) => action.position === PositionTypes.RB),
      withLatestFrom(this._store.select(getFantasyFootballState)),
      switchMap(([, state]) =>
        iif(() => !state.rbs, [loadRbs()], [loadRbsSuccess(state.rbs as RB[])])
      )
    )
  );

  setPositionTypesReceivers$ = createEffect(() =>
    this._actions$.pipe(
      ofType(setPositionType),
      filter(
        (action) =>
          action.position === PositionTypes.WR ||
          action.position === PositionTypes.TE
      ),
      withLatestFrom(this._store.select(getFantasyFootballState)),
      switchMap(([, state]) =>
        iif(
          () => !state.receivers,
          [loadReceivers()],
          [loadReceiversSuccess(state.receivers as Receivers[])]
        )
      )
    )
  );

  setPositionTypesDefenses$ = createEffect(() =>
    this._actions$.pipe(
      ofType(setPositionType),
      filter((action) => action.position === PositionTypes.DEF),
      withLatestFrom(this._store.select(getFantasyFootballState)),
      switchMap(([, state]) =>
        iif(
          () => !state.defenses,
          [loadDefenses()],
          [loadDefensesSuccess(state.defenses as Defense[])]
        )
      )
    )
  );
}
