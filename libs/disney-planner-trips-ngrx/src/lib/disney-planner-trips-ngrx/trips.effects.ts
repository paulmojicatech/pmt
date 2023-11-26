import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadUpcomingTrips, loadUpcomingTripsSuccess } from './trips.actions';
import { filter, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUpcomingTrips } from './trips.selectors';
import { UpcomingTrip } from 'disney-planner-models';

@Injectable()
export class UpcomingTripsEffects {
  private _actions$ = inject(Actions);
  private _store = inject(Store);

  loadUpcomingTrips$ = createEffect(
    () => this._actions$.pipe(
      ofType(loadUpcomingTrips),
      withLatestFrom(this._store.select(selectUpcomingTrips)),
      filter(([, trips]) => !trips.length),
      switchMap(() => {
        const mockTrips: UpcomingTrip[] = [
          {
            date: '2023-12-15',
            park: 'magic'
          },
          {
            date: '2023-12-16',
            park: 'epcot'
          },
          {
            date: '2023-12-17',
            park: 'studios'
          }
        ];
        return [loadUpcomingTripsSuccess(mockTrips)];
      })

    )
  );
}