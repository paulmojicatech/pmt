import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import {
  ItemsToGetStateService,
  ItemsToGetViewModel,
} from '@pmt/grocery-list-organizer-business-logic-items-to-get';
import {
  CurrentGroceryItem,
  GroceryItem,
} from '@pmt/grocery-list-organizer-shared-business-logic';
import { from, Observable, Subject, takeLast, takeUntil } from 'rxjs';

@Component({
  selector: 'pmt-items-to-get',
  templateUrl: './items-to-get.component.html',
  styleUrls: ['./items-to-get.component.scss'],
  providers: [ItemsToGetStateService],
})
export class ItemsToGetComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('ionModal')
  ionModal!: IonModal;

  viewModel$!: Observable<ItemsToGetViewModel>;
  itemsToGetForm!: FormGroup;

  private _componentDestroyed$ = new Subject<void>();

  constructor(
    public itemsToGetStateSvc: ItemsToGetStateService,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.viewModel$ = this.itemsToGetStateSvc.getViewModel();
    this.itemsToGetForm = this._fb.group({
      itemToAdd: [null, [Validators.required]],
      qty: [null, [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    this.ionModal.ionModalDidDismiss
      .pipe(takeUntil(this._componentDestroyed$))
      .subscribe(() => {
        this.itemsToGetForm.reset();
      });
  }

  ngOnDestroy(): void {
    this._componentDestroyed$.next();
  }

  addItem(): void {
    const itemToAdd: GroceryItem = {
      name: this.itemsToGetForm.get('itemToAdd')?.value,
      qty: this.itemsToGetForm.get('qty')?.value,
    };
    this.itemsToGetStateSvc.addItem(itemToAdd);
    this.itemsToGetForm.reset();
  }

  handleAutocompleteChangeEv(updatedValue: string): void {
    this.itemsToGetForm.get('itemToAdd')?.patchValue(updatedValue);
  }

  handleItemToGetChanged(itemToRemove: CurrentGroceryItem): void {
    this.itemsToGetStateSvc.removeItemFromItemsToGet(itemToRemove);
  }
}
