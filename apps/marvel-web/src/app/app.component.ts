import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, initApp } from '@pmt/marvel-shared-business-logic';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'pmt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  footerText$!: Observable<string | undefined>;

  constructor(private _store: Store<AppState>) {}

  ngOnInit(): void {
    this._store.dispatch(initApp());
    this.footerText$ = this._store.pipe(map((state) => state.footerText));
  }
}
