import { createAction, props } from '@ngrx/store';
import { CurrentGroceryItem } from '@pmt/grocery-list-organizer-shared-business-logic';

export enum CurrentItemActionType {
  LOAD_CURRENT_ITEMS = '[CURRENT]Load Current Items',
  LOAD_CURRENT_ITEMS_SUCCESS = '[CURRENT]Load Current Items Success',
}

export const loadCurrentItems = createAction(
  CurrentItemActionType.LOAD_CURRENT_ITEMS
);

export const loadCurrentItemsSuccess = createAction(
  CurrentItemActionType.LOAD_CURRENT_ITEMS_SUCCESS,
  props<{ currentItems: CurrentGroceryItem[] }>()
);
