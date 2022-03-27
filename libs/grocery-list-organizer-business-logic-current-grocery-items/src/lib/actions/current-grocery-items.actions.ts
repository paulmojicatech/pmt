import { createAction, props } from '@ngrx/store';
import { CurrentGroceryItem } from '@pmt/grocery-list-organizer-shared-business-logic';

export enum CurrentItemActionType {
  LOAD_CURRENT_ITEMS = '[Current] Load Current Items',
  LOAD_CURRENT_ITEMS_SUCCESS = '[Current] Load Current Items Success',
  ADD_ITEM_TO_CURRENT_LIST = '[Current] Add Item to Current List',
}

export const loadCurrentItems = createAction(
  CurrentItemActionType.LOAD_CURRENT_ITEMS
);

export const loadCurrentItemsSuccess = createAction(
  CurrentItemActionType.LOAD_CURRENT_ITEMS_SUCCESS,
  props<{ currentItems: CurrentGroceryItem[] }>()
);

export const addItemToCurrentList = createAction(
  CurrentItemActionType.ADD_ITEM_TO_CURRENT_LIST,
  props<{ itemToAdd: CurrentGroceryItem }>()
);
