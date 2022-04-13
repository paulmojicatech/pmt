import { createReducer, on } from '@ngrx/store';
import {
  addItemToCurrentList,
  decrementItemQty,
  loadCurrentItemsSuccess,
  markItemAsUsed,
  throwAwayItem,
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
  }),
  on(decrementItemQty, (state, { itemToDecrement }) => {
    const updatedItems = state.currentItems?.map((item) => {
      if (item.id === itemToDecrement.id) {
        const updatedItem = { ...item, qty: itemToDecrement.qty - 1 };
        return updatedItem;
      }
      return item;
    });
    return { ...state, currentItems: updatedItems };
  }),
  on(throwAwayItem, (state, { itemToThrowAway }) => {
    const updatedItems = state.currentItems?.filter(
      (item) => item.id !== itemToThrowAway.id
    );
    return { ...state, currentItems: updatedItems };
  })
);
