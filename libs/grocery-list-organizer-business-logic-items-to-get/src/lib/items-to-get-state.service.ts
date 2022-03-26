import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CurrentGroceryItem,
  GroceryItem,
} from '@pmt/grocery-list-organizer-shared-business-logic';
import {
  BehaviorSubject,
  ignoreElements,
  map,
  merge,
  Observable,
  tap,
} from 'rxjs';
import {
  addItemToGet,
  loadItemsToGet,
  setIsItemsToGetModalOpen,
} from './actions/items-to-get.actions';
import {
  getAllAvailableItems,
  getIsAddItemsToGetModelOpen,
  getItemsToGet,
} from './index';
import { ItemsToGetState } from './models/items-to-get-state.interface';
import { ItemsToGetViewModel } from './models/items-to-get.interface';

@Injectable()
export class ItemsToGetStateService {
  readonly INITIAL_STATE: ItemsToGetViewModel = {
    itemsNeeded: [],
    noItemsText: 'You currently do not have any items on your grocery list.',
    isModalOpen: false,
    allAvailableItems: [],
  };

  private _viewModelSub$ = new BehaviorSubject<ItemsToGetViewModel>(
    this.INITIAL_STATE
  );
  viewModel$ = this._viewModelSub$.asObservable();

  constructor(private _store: Store<ItemsToGetState>) {}

  getViewModel(): Observable<ItemsToGetViewModel> {
    this._store.dispatch(loadItemsToGet());
    const items$ = this._store.select(getItemsToGet).pipe(
      tap((items) => {
        this._viewModelSub$.next({
          ...this._viewModelSub$.getValue(),
          itemsNeeded: items,
        });
      }),
      ignoreElements()
    );
    const isModalOpen$ = this._store.select(getIsAddItemsToGetModelOpen).pipe(
      tap((isOpen) => {
        this._viewModelSub$.next({
          ...this._viewModelSub$.getValue(),
          isModalOpen: isOpen,
        });
      }),
      ignoreElements()
    );
    const allAvailableItems$ = this._store.select(getAllAvailableItems).pipe(
      map((allAvailableItems) => {
        return allAvailableItems.map((item) => item.name);
      }),
      tap((allAvailableItems) => {
        this._viewModelSub$.next({
          ...this._viewModelSub$.getValue(),
          allAvailableItems,
        });
      }),
      ignoreElements()
    );

    return merge(this.viewModel$, items$, isModalOpen$, allAvailableItems$);
  }

  setIsModalOpen(isOpen: boolean): void {
    this._store.dispatch(setIsItemsToGetModalOpen({ isOpen }));
  }

  addItem(itemToAdd: GroceryItem): void {
    this._store.dispatch(addItemToGet({ item: itemToAdd }));
    this._store.dispatch(setIsItemsToGetModalOpen({ isOpen: false }));
  }
}
