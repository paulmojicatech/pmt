import { GroceryItem } from '../../../../grocery-list-organizer-shared-business-logic/src/lib/services/storage/models/storage.interface';

export interface ItemsToGetState {
  isAddItemModalVisible: boolean;
  itemsToGet: GroceryItem[];
  isLoaded: boolean;
}
