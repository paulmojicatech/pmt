import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, filter, map, switchMap, withLatestFrom } from "rxjs";
import { RssFeedType } from "../../enums/topics.enum";
import { TopicsState } from "../../models/topics.interface";
import { EspnRssFeedService } from "../../services/espn-rss-feed.service";
import { TheFootballersRssFeedService } from "../../services/the-footballers-rss-feed.service";
import { loadTopics, loadTopicsFail, loadTopicsSuccess } from "../actions/topics.actions";
import { getTopicsState } from "../selectors/topics.selector";

@Injectable()

export class TopicEffects {
    constructor(private _actions$: Actions, private _espnRssSvc: EspnRssFeedService, private _footballersRssSvc: TheFootballersRssFeedService, private _store: Store<TopicsState>) {}

    loadTopicsEspn$ = createEffect(
        () => this._actions$.pipe(
            ofType(loadTopics),
            filter(action => action.rssFeed === RssFeedType.ESPN),
            withLatestFrom(this._store.select(getTopicsState)),
            switchMap(() => this._espnRssSvc.getTopics().pipe(
                map(topics => loadTopicsSuccess(topics)),
                catchError(err => [loadTopicsFail(`${err}`)])
            ))
        )
    );

    loadTopicsFootballers$ = createEffect(
        () => this._actions$.pipe(
            ofType(loadTopics),
            filter(action => action.rssFeed === RssFeedType.FOOTBALLERS),
            withLatestFrom(this._store.select(getTopicsState)),
            switchMap(() => this._footballersRssSvc.getTopics().pipe(
                map(topics => loadTopicsSuccess(topics)),
                catchError(err => [loadTopicsFail(`${err}`)])
            ))
        )
    );
}