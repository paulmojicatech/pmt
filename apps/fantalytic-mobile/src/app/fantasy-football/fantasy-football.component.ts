/* eslint-disable no-underscore-dangle */
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getSelectedYear } from './ngrx/selectors/fantasy-football.selectors';

@Component({
  selector: 'pmt-fantasy-football',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './fantasy-football.component.html',
  styleUrls: ['./fantasy-football.component.scss'],
})
export class FantasyFootballComponent {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly AVAILABLE_YEARS = [2018,2019,2020,2021,2022];
  // eslint-disable-next-line @typescript-eslint/member-ordering
  selectedYear$: Observable<number>;

  constructor(private _store: Store) {
    this.selectedYear$ = this._store.select(getSelectedYear);
  }

}
