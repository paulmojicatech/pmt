import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TRIPS_STATE_KEY, UpcomingTripsState } from './trips.feature';
import {
 } from './trips.feature';

export const selectUpcomingTripsState = createFeatureSelector<UpcomingTripsState>(TRIPS_STATE_KEY);

export const selectUpcomingTrips = createSelector(
  selectUpcomingTripsState,
  (state: UpcomingTripsState) => state.trips
);
