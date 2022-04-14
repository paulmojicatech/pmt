import { createAction, props } from '@ngrx/store';
import { CurrentGroceryItem } from '@pmt/grocery-list-organizer-shared-business-logic';

export enum CurrentItemActionType {
  LOAD_CURRENT_ITEMS = '[Current] Load Current Items',
  LOAD_CURRENT_ITEMS_SUCCESS = '[Current] Load Current Items Success',
  ADD_ITEM_TO_CURRENT_LIST = '[Current] Add Item to Current List',
  MARK_ITEM_AS_USED = '[Current] Mark Item As Used',
  DECREMENT_ITEM_QTY = '[Current] Decrement Item Qty',
  THROW_AWAY_ITEM = '[Current] Throw Away Item',
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

export const markItemAsUsed = createAction(
  CurrentItemActionType.MARK_ITEM_AS_USED,
  props<{ usedItem: CurrentGroceryItem }>()
);

export const decrementItemQty = createAction(
  CurrentItemActionType.DECREMENT_ITEM_QTY,
  props<{ itemToDecrement: CurrentGroceryItem }>()
);

export const throwAwayItem = createAction(
  CurrentItemActionType.THROW_AWAY_ITEM,
  props<{ itemToThrowAway: CurrentGroceryItem }>()
);
