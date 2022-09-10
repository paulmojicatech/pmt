import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs";
import { FantalyticHttpService } from "../../services/fantalytic-http.service";
import { fantasyFootballError, loadQbs, loadQbsSuccess } from "../actions/fantasy-football.actions";

@Injectable()
export class FantasyFootballEffects {
    constructor(private _actions$: Actions, private _fantasyHttpSvc: FantalyticHttpService) {}

    loadQbs$ = createEffect(
        () => this._actions$.pipe(
            ofType(loadQbs),
            switchMap(() => this._fantasyHttpSvc.getQBss().pipe(
                map(qbs => loadQbsSuccess(qbs)),
                catchError(err => ([fantasyFootballError(err)]))
            ))
        )
    );
}
