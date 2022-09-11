import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { PositionTypes } from "@pmt/fantalytic-shared";
import { catchError, filter, map, switchMap, withLatestFrom } from "rxjs";
import { FantasyFootballState } from "../../models/fantasy-football.interface";
import { FantalyticHttpService } from "../../services/fantalytic-http.service";
import { fantasyFootballError, loadQbs, loadQbsSuccess, setPositionType, setRowData } from "../actions/fantasy-football.actions";
import { getQbs } from "../selectors/fantasy-football.selectors";

@Injectable()
export class FantasyFootballEffects {
    constructor(private _actions$: Actions, private _fantasyHttpSvc: FantalyticHttpService, private _store: Store<FantasyFootballState>) {}

    loadQbs$ = createEffect(
        () => this._actions$.pipe(
            ofType(loadQbs),
            withLatestFrom(this._store.select(getQbs)),
            filter(([, qbs]) => !qbs),
            switchMap(() => this._fantasyHttpSvc.getQBs().pipe(
                map(qbs => loadQbsSuccess(qbs)),
                catchError(err => ([fantasyFootballError(err)]))
            ))
        )
    );

    setRowData$ = createEffect(
        () => this._actions$.pipe(
            ofType(loadQbsSuccess),
            map(action => setRowData(action.qbs))
        )
    );

    setPositionTypes$ = createEffect(
        () => this._actions$.pipe(
            ofType(setPositionType),
            filter(action => action.position === PositionTypes.QB),
            map((loadQbs))
        )
    );
}

