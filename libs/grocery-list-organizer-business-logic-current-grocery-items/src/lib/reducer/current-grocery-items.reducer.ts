import { createReducer, on } from '@ngrx/store';
import {
  addItemToCurrentList,
  loadCurrentItemsSuccess,
  markItemAsUsed,
} from '../actions/current-grocery-items.actions';
import { CurrentListState } from '../models/current-list.interface';

const initialState: CurrentListState = {
  currentItems: undefined,
};

export const currentGroceryItemsReducer = createReducer(
  initialState,
  on(loadCurrentItemsSuccess, (state, { currentItems }) => ({
    ...state,
    currentItems,
  })),
  on(addItemToCurrentList, (state, { itemToAdd }) => {
    const updatedItems = [...(state.currentItems ?? []), itemToAdd];
    return { ...state, currentItems: updatedItems };
  }),
  on(markItemAsUsed, (state, { usedItem }) => {
    const currentItems = state.currentItems?.filter(
      (item) => item.id !== usedItem.id
    );
    return { ...state, currentItems };
  })
);
