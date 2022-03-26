import { createReducer, on } from '@ngrx/store';
import { loadCurrentItemsSuccess } from '../actions/current-grocery-items.actions';
import { CurrentListState } from '../models/current-list.interface';

const initialState: CurrentListState = {
  currentItems: undefined,
};

export const currentGroceryItemsReducer = createReducer(
  initialState,
  on(loadCurrentItemsSuccess, (state, { currentItems }) => ({
    ...state,
    currentItems,
  }))
);
