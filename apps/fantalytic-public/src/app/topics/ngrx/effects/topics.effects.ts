import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, filter, map, switchMap, withLatestFrom } from "rxjs";
import { TopicsState } from "../../models/topics.interface";
import { EspnRssFeedService } from "../../services/espn-rss-feed.service";
import { loadTopics, loadTopicsFail, loadTopicsSuccess } from "../actions/topics.actions";
import { getTopicsState } from "../selectors/topics.selector";

@Injectable()
export class TopicEffects {
    constructor(private _actions$: Actions, private _espnRssSvc: EspnRssFeedService, private _store: Store<TopicsState>) {}

    loadTopics$ = createEffect(
        () => this._actions$.pipe(
            ofType(loadTopics),
            withLatestFrom(this._store.select(getTopicsState)),
            filter(([, state]) => !state.topics),
            switchMap(() => this._espnRssSvc.getTopics().pipe(
                map(topics => loadTopicsSuccess(topics)),
                catchError(err => [loadTopicsFail(`${err}`)])
            ))
        )
    );
}