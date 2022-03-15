import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ItemsToGetStateService,
  ItemsToGetViewModel,
} from '@pmt/grocery-list-organizer-business-logic-items-to-get';
import { GroceryItem } from '@pmt/grocery-list-organizer-shared-business-logic';
import { Observable } from 'rxjs';

@Component({
  selector: 'pmt-items-to-get',
  templateUrl: './items-to-get.component.html',
  styleUrls: ['./items-to-get.component.scss'],
})
export class ItemsToGetComponent implements OnInit {
  viewModel$!: Observable<ItemsToGetViewModel>;
  itemsToGetForm!: FormGroup;

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

  addItem(): void {
    const itemToAdd: GroceryItem = {
      name: this.itemsToGetForm.get('itemToAdd')?.value,
      qty: this.itemsToGetForm.get('qty')?.value,
    };
    this.itemsToGetStateSvc.addItem(itemToAdd);
  }

  handleAutocompleteChangeEv(updatedValue: string): void {
    this.itemsToGetForm.get('itemToAdd')?.patchValue(updatedValue);
  }
}
