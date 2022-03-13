import { Component, OnInit } from '@angular/core';
import {
  ItemsToGetStateService,
  ItemsToGetViewModel,
} from '@pmt/grocery-list-organizer-business-logic-items-to-get';
import { Observable } from 'rxjs';

@Component({
  selector: 'pmt-items-to-get',
  templateUrl: './items-to-get.component.html',
  styleUrls: ['./items-to-get.component.scss'],
})
export class ItemsToGetComponent implements OnInit {
  viewModel$!: Observable<ItemsToGetViewModel>;
  constructor(public itemsToGetStateSvc: ItemsToGetStateService) {}

  ngOnInit(): void {
    this.viewModel$ = this.itemsToGetStateSvc.getViewModel();
  }
}
