import { createFeature, createReducer, on } from '@ngrx/store';
import { UpcomingTrip } from 'disney-planner-models';
import { loadUpcomingTripsSuccess } from './trips.actions';

export interface UpcomingTripsState {
  readonly trips: UpcomingTrip[];
}

const initialState: UpcomingTripsState = {
  trips: []
};

export const TRIPS_STATE_KEY = 'upcomingTrips';

export const upcomingTripsFeature = createFeature({
  name: TRIPS_STATE_KEY,
  reducer: createReducer(
    initialState,
    on(
      loadUpcomingTripsSuccess,
      (state, { trips }) => ({ ...state, trips })
    )
  )
});
