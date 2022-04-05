import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CurrentGroceryItem } from '@pmt/grocery-list-organizer-shared-business-logic';
import { BehaviorSubject, map, merge, Observable, tap } from 'rxjs';
import { getCurrentItems } from '..';
import {
  decrementItemQty,
  markItemAsUsed,
} from '../actions/current-grocery-items.actions';
import {
  CurrentListState,
  CurrentListViewModel,
} from '../models/current-list.interface';

@Injectable()
export class CurrentListStateService {
  readonly INITIAL_STATE: CurrentListViewModel = {
    noItemsText: 'You currently have no items.',
    searchValue: undefined,
    currentItems: [],
  };

  private _viewModelSub$ = new BehaviorSubject<CurrentListViewModel>(
    this.INITIAL_STATE
  );
  viewModel$ = this._viewModelSub$.asObservable();

  constructor(private _store: Store<CurrentListState>) {}

  getViewModel(): Observable<CurrentListViewModel> {
    const initialViewModel$ = this._store.select(getCurrentItems).pipe(
      map((currentItems) => {
        const itemsToReturn: CurrentGroceryItem[] = currentItems ?? [];
        const viewModel: CurrentListViewModel = {
          currentItems: itemsToReturn,
          noItemsText: 'You currently have no items.',
          searchValue: undefined,
        };
        return viewModel;
      }),
      tap((vm) => this._viewModelSub$.next(vm))
    );
    return merge(this.viewModel$, initialViewModel$);
  }

  markItemAsUsed(usedItem: CurrentGroceryItem): void {
    this._store.dispatch(markItemAsUsed({ usedItem }));
  }

  decrementItem(itemToDecrement: CurrentGroceryItem): void {
    this._store.dispatch(decrementItemQty({ itemToDecrement }));
  }

  handleSearchValueUpdate(searchValue: string): void {
    this._viewModelSub$.next({
      ...this._viewModelSub$.getValue(),
      searchValue,
    });
  }
}
