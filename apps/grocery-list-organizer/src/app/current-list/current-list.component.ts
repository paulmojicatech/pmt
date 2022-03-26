import { Component, OnInit } from '@angular/core';
import {
  CurrentListStateService,
  CurrentListViewModel,
} from '@pmt/grocery-list-organizer-business-logic-current-grocery-items';
import { Observable } from 'rxjs';

@Component({
  selector: 'pmt-current-list',
  templateUrl: './current-list.component.html',
  styleUrls: ['./current-list.component.scss'],
  providers: [CurrentListStateService],
})
export class CurrentListComponent implements OnInit {
  viewModel$!: Observable<CurrentListViewModel>;

  constructor(private _currentListStateSvc: CurrentListStateService) {}

  ngOnInit(): void {
    this.viewModel$ = this._currentListStateSvc.getViewModel();
  }
}
