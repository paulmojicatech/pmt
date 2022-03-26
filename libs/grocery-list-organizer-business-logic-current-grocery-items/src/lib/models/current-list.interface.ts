import { CurrentGroceryItem } from '@pmt/grocery-list-organizer-shared-business-logic';

export interface CurrentListViewModel {
  currentItems: CurrentGroceryItem[];
  noItemsText: string;
}

export interface CurrentListState {
  currentItems: CurrentGroceryItem[] | undefined;
}
