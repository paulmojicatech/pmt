export enum IonicStorageType {
  CURRENT_ITEMS,
  AVAILABLE_ITEMS,
  COMPLETED_ITEMS,
}

export interface GroceryItem {
  id: string;
  name: string;
  qty: number;
  datePurchased: string;
  dateUsed?: string;
  qtyUsed?: number;
  dateThrownAway?: string;
  qtyThrownAway?: number;
}

export type CurrentGroceryItem = Omit<
  GroceryItem,
  'dateUsed' | 'qtyUsed' | 'dateThrownAway' | 'qtyThrownAway'
>;

export type AvailableGroceryItem = Omit<
  GroceryItem,
  | 'id'
  | 'qty'
  | 'datePurchased'
  | 'dateUsed'
  | 'qtyUsed'
  | 'dateThrownAway'
  | 'qtyThrownAway'
>;
