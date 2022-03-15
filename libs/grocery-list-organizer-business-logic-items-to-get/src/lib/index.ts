import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemsToGetState } from './models/items-to-get-state.interface';

const itemsToGetState = createFeatureSelector<ItemsToGetState>('items-to-get');

export const getIsInitiallyLoaded = createSelector(
  itemsToGetState,
  (state) => state.isLoaded
);

export const getItemsToGet = createSelector(
  itemsToGetState,
  (state) => state.itemsToGet
);

export const getIsAddItemsToGetModelOpen = createSelector(
  itemsToGetState,
  (state) => state.isAddItemModalVisible
);

export const getAllAvailableItems = createSelector(
  itemsToGetState,
  (state) => state.allAvailableItems
);
