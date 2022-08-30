import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { LineChartViewModel } from '../../components/line-chart/models/line-chart.interface';
import { FantasyFootballState } from '../models/fantasy-football.interface';
import { getPosition, getSelectedPlayers, getSelectedRowData } from '../ngrx/selectors/fantasy-football.selectors';
import {forkJoin, take, map, Observable} from 'rxjs';
import { PositionTypes } from '@pmt/fantalytic-shared';
import { getLineChartViewModelForQBs, getLineChartViewModelForRBs } from '../functions/fantasy-football.functions';

@Injectable({
  providedIn: 'root'
})
export class FantasyFootballLineChartService {

  constructor(private _store: Store<FantasyFootballState>) { }

  getLineChartViewModel(): Observable<LineChartViewModel | undefined> {
    const position$ = this._store.select(getPosition).pipe(take(1));
    const selectedRowData$ = this._store.select(getSelectedRowData).pipe(take(1));
    const selectedPlayers$ = this._store.select(getSelectedPlayers).pipe(take(1));
    return forkJoin([position$, selectedRowData$, selectedPlayers$]).pipe(
      map(([position, selectedRowData, selectedPlayers]) => {
        switch (position) {
          case PositionTypes.QB: {
            const filteredRowData = selectedRowData?.filter(row => {
              return selectedPlayers?.some(player => row['player'] === player);
            });
            return getLineChartViewModelForQBs(filteredRowData ?? []);
          }
          case PositionTypes.RB: {
            const filteredRowData = selectedRowData?.filter(row => {
              return selectedPlayers?.some(player => player === row['player']);
            });
            return getLineChartViewModelForRBs(filteredRowData ?? []);
          }
          default:
            return undefined;
        }
      })
    )
  }
  
}
