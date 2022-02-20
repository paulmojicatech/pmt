import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GlobalState } from './reducer/global.reducer';

const globalState = createFeatureSelector<GlobalState>('app');

export const getGlobalState = createSelector(globalState, (state) => state);
