import { GroceryItem } from '../../../../grocery-list-organizer-shared-business-logic/src/lib/services/storage/models/storage.interface';

export interface ItemsToGetViewModel {
  isModalOpen: boolean;
  itemsNeeded: GroceryItem[];
  noItemsText: string;
}
