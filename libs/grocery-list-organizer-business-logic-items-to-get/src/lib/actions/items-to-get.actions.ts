import { createAction, props } from '@ngrx/store';
import {
  AvailableGroceryItem,
  GroceryItem,
} from '@pmt/grocery-list-organizer-shared-business-logic';

export enum ItemsToGetActionType {
  LOAD_ITEMS_TO_GET = '[Items to Get] Load Items to Get',
  LOAD_ITEMS_TO_GET_SUCCESS = '[Items to Get] Load Items to Get Success',
  SET_IS_ITEMS_TO_GET_MODAL_OPEN = '[Items to Get] Set Is Items to Get Modal Open',
  ADD_ITEM_TO_GET = '[Items to Get] Add Item to Get',
  LOAD_ALL_AVAILABLE_ITEMS = '[Items to Get] Load All Available Items',
}

export const loadItemsToGet = createAction(
  ItemsToGetActionType.LOAD_ITEMS_TO_GET
);

export const loadItemsToGetSucccess = createAction(
  ItemsToGetActionType.LOAD_ITEMS_TO_GET_SUCCESS,
  props<{ items: GroceryItem[] }>()
);

export const setIsItemsToGetModalOpen = createAction(
  ItemsToGetActionType.SET_IS_ITEMS_TO_GET_MODAL_OPEN,
  props<{ isOpen: boolean }>()
);

export const addItemToGet = createAction(
  ItemsToGetActionType.ADD_ITEM_TO_GET,
  props<{ item: GroceryItem }>()
);

export const loadAllAvailableItems = createAction(
  ItemsToGetActionType.LOAD_ALL_AVAILABLE_ITEMS,
  props<{ allAvailableItems: AvailableGroceryItem[] }>()
);
