import { createReducer, on } from '@ngrx/store';
import { CurrentGroceryItem } from '../../../services/storage/models/storage.interface';
import { loadCurrentItemsSuccess } from '../actions/current-grocery-items.actions';

export interface CurrentGroceryItemsState {
  currentItems?: CurrentGroceryItem[];
}

const initialState: CurrentGroceryItemsState = {
  currentItems: undefined,
};

export const currentGroceryItemsReducer = createReducer(
  initialState,
  on(loadCurrentItemsSuccess, (state, { currentItems }) => ({
    ...state,
    currentItems,
  }))
);
