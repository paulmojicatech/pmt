import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CurrentGroceryItemsState } from './reducer/current-grocery-items.reducer';

export const currentGroceryItemStore =
  createFeatureSelector<CurrentGroceryItemsState>('current-grocery-items');

export const getCurrentItems = createSelector(
  currentGroceryItemStore,
  (state) => state.currentItems
);
