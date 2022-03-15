import { GroceryItem } from '@pmt/grocery-list-organizer-shared-business-logic';

export interface ItemsToGetViewModel {
  isModalOpen: boolean;
  itemsNeeded: GroceryItem[];
  noItemsText: string;
  allAvailableItems: string[];
}
