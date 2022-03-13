import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ProfileState,
  routeToProfileModule,
} from '@pmt/grocery-list-organizer-business-logic-profile';

@Component({
  selector: 'pmt-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private _store: Store<ProfileState>) {}

  ngOnInit(): void {
    this._store.dispatch(routeToProfileModule());
  }
}
