import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Defense, PositionTypes, QB, RB, Receivers } from "@pmt/fantalytic-shared";
import { catchError, filter, iif, map, switchMap, withLatestFrom } from "rxjs";
import { FantasyFootballState } from "../../models/fantasy-football.interface";
import { FantalyticHttpService } from "../../services/fantalytic-http.service";
import { fantasyFootballError, loadDefenses, loadDefensesSuccess, loadQbs, loadQbsSuccess, loadRbs, loadRbsSuccess, loadReceivers, loadReceiversSuccess, setPositionType } from "../actions/fantasy-football.actions";
import { getDefenses, getQbs, getRbs, getReceivers } from "../selectors/fantasy-football.selectors";

@Injectable()
export class FantasyFootballEffects {
    constructor(private _actions$: Actions, private _fantasyHttpSvc: FantalyticHttpService, private _store: Store<FantasyFootballState>) {}

    loadQbs$ = createEffect(
        () => this._actions$.pipe(
            ofType(loadQbs),
            switchMap(() => this._fantasyHttpSvc.getQBs().pipe(
                map(qbs => loadQbsSuccess(qbs)),
                catchError(err => ([fantasyFootballError(err)]))
            ))
        )
    );

    loadRbs$ = createEffect(
        () => this._actions$.pipe(
            ofType(loadRbs),
            switchMap(() => this._fantasyHttpSvc.getRBs().pipe(
                map(rbs => loadRbsSuccess(rbs)),
                catchError(err => ([fantasyFootballError(err)]))
            ))
        )
    );

    loadReceivers$ = createEffect(
        () => this._actions$.pipe(
            ofType(loadReceivers),
            switchMap(() => this._fantasyHttpSvc.getReceviers().pipe(
                map(receivers => loadReceiversSuccess(receivers)),
                catchError(err => ([fantasyFootballError(err)]))
            ))
        )
    );

    loadDefenses$ = createEffect(
        () => this._actions$.pipe(
            ofType(loadDefenses),
            switchMap(() => this._fantasyHttpSvc.getDefenses().pipe(
                map(defenses => loadDefensesSuccess(defenses)),
                catchError(err => ([fantasyFootballError(err)]))
            ))
        )
    );

    setPositionTypesQb$ = createEffect(
        () => this._actions$.pipe(
            ofType(setPositionType),
            filter(action => action.position === PositionTypes.QB),
            withLatestFrom(this._store.select(getQbs)),
            switchMap(([,qbs]) => iif(() => !qbs, [loadQbs()], [loadQbsSuccess(qbs as QB[])]))
        )
    );

    setPositionTypesRb$ = createEffect(
        () => this._actions$.pipe(
            ofType(setPositionType),
            filter(action => action.position === PositionTypes.RB),
            withLatestFrom(this._store.select(getRbs)),
            switchMap(([,rbs]) => iif(() => !rbs, [loadRbs()], [loadRbsSuccess(rbs as RB[])]))
        )
    );

    setPositionTypesReceivers$ = createEffect(
        () => this._actions$.pipe(
            ofType(setPositionType),
            filter(action => action.position === PositionTypes.WR || action.position === PositionTypes.TE),
            withLatestFrom(this._store.select(getReceivers)),
            switchMap(([,receivers]) => iif(() => !receivers, [loadReceivers()], [loadReceiversSuccess(receivers as Receivers[])]))
        )
    );

    setPositionTypesDefenses$ = createEffect(
        () => this._actions$.pipe(
            ofType(setPositionType),
            filter(action => action.position === PositionTypes.DEF),
            withLatestFrom(this._store.select(getDefenses)),
            switchMap(([, defenses]) => iif(() => !defenses, [loadDefenses()], [loadDefensesSuccess(defenses as Defense[])]))
        )
    );
}

