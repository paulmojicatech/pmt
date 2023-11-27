import { createAction } from '@ngrx/store';
import { UpcomingTrip } from 'disney-planner-models';

export const loadUpcomingTrips = createAction('[UpcomingTrips] Load UpcomingTrips');
export const loadUpcomingTripsSuccess = createAction('[UpcomingTrips] Load UpcomingTrips Success', (trips: UpcomingTrip[]) => ({ trips }));
export const loadUpcomingTripsFailure = createAction('[UpcomingTrips] Load UpcomingTrips Failure');