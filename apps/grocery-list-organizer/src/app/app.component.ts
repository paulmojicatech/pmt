import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  GlobalState,
  initializeApp,
} from '@pmt/grocery-list-organizer-shared-business-logic';

@Component({
  selector: 'pmt-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private _store: Store<GlobalState>) {
    this._store.dispatch(initializeApp());
  }
}
