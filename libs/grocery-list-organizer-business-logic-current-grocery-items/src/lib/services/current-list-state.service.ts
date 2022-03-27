import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CurrentGroceryItem } from '@pmt/grocery-list-organizer-shared-business-logic';
import { map, Observable } from 'rxjs';
import { getCurrentItems } from '..';
import { markItemAsUsed } from '../actions/current-grocery-items.actions';
import {
  CurrentListState,
  CurrentListViewModel,
} from '../models/current-list.interface';

@Injectable()
export class CurrentListStateService {
  constructor(private _store: Store<CurrentListState>) {}

  getViewModel(): Observable<CurrentListViewModel> {
    const viewModel$ = this._store.select(getCurrentItems).pipe(
      map((currentItems) => {
        const itemsToReturn: CurrentGroceryItem[] = currentItems ?? [];
        const viewModel: CurrentListViewModel = {
          currentItems: itemsToReturn,
          noItemsText: 'You currently have no items.',
        };
        return viewModel;
      })
    );
    return viewModel$;
  }

  markItemAsUsed(usedItem: CurrentGroceryItem): void {
    this._store.dispatch(markItemAsUsed({ usedItem }));
  }
}
