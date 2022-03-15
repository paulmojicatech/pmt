import {
  AvailableGroceryItem,
  GroceryItem,
} from '@pmt/grocery-list-organizer-shared-business-logic';

export interface ItemsToGetState {
  isAddItemModalVisible: boolean;
  itemsToGet: GroceryItem[];
  isLoaded: boolean;
  allAvailableItems: AvailableGroceryItem[];
}
