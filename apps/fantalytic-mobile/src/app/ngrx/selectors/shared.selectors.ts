import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from '../reducers/shared.reducer';

const selectSharedState = createFeatureSelector<SharedState>('shared');

export const selectHasBackButton = createSelector(
    selectSharedState,
    state => state.hasBackButton
);
