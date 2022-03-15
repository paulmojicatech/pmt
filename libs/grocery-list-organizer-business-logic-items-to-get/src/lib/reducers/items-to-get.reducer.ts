import { createReducer, on } from '@ngrx/store';
import {
  addItemToGet,
  loadAllAvailableItems,
  loadItemsToGetSucccess,
  setIsItemsToGetModalOpen,
} from '../actions/items-to-get.actions';
import { ItemsToGetState } from '../models/items-to-get-state.interface';

const initialState: ItemsToGetState = {
  itemsToGet: [],
  isLoaded: false,
  isAddItemModalVisible: false,
  allAvailableItems: [],
};

export const itemsToGetReducer = createReducer(
  initialState,
  on(loadItemsToGetSucccess, (state, { items }) => ({
    ...state,
    isLoaded: true,
    itemsToGet: items,
  })),
  on(setIsItemsToGetModalOpen, (state, { isOpen }) => ({
    ...state,
    isAddItemModalVisible: isOpen,
  })),
  on(addItemToGet, (state, { item }) => {
    const updatedItems = state.itemsToGet
      ? [...state.itemsToGet, item]
      : [item];
    return {
      ...state,
      itemsToGet: updatedItems,
    };
  }),
  on(loadAllAvailableItems, (state, { allAvailableItems }) => ({
    ...state,
    allAvailableItems,
  }))
);
