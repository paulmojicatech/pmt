import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CurrentListState } from './models/current-list.interface';

export const currentGroceryItemStore =
  createFeatureSelector<CurrentListState>('current-list');

export const getCurrentItems = createSelector(
  currentGroceryItemStore,
  (state) => state.currentItems ?? []
);
