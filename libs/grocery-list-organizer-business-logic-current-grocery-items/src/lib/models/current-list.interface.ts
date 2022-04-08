import { CurrentGroceryItem } from '@pmt/grocery-list-organizer-shared-business-logic';

export interface CurrentListViewModel {
  currentItems: CurrentGroceryItem[];
  noItemsText: string;
  searchValue: string | undefined;
}

export interface CurrentListState {
  currentItems: CurrentGroceryItem[] | undefined;
}
