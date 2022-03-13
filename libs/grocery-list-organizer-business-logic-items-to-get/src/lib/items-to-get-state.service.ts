import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, ignoreElements, merge, Observable, tap } from 'rxjs';
import {
  loadItemsToGet,
  setIsItemsToGetModalOpen,
} from './actions/items-to-get.actions';
import { getIsAddItemsToGetModelOpen, getItemsToGet } from './index';
import { ItemsToGetState } from './models/items-to-get-state.interface';
import { ItemsToGetViewModel } from './models/items-to-get.interface';

@Injectable({
  providedIn: 'root',
})
export class ItemsToGetStateService {
  readonly INITIAL_STATE: ItemsToGetViewModel = {
    itemsNeeded: [],
    noItemsText: 'You currently do not have any items on your grocery list.',
    isModalOpen: false,
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

    return merge(this.viewModel$, items$, isModalOpen$);
  }

  setIsModalOpen(isOpen: boolean): void {
    this._store.dispatch(setIsItemsToGetModalOpen({ isOpen }));
  }
}
