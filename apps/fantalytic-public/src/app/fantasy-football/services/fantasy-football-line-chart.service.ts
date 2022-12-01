import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { LineChartViewModel, FantasyFootballState, PositionTypes, QB, RB, Receivers, getLineChartViewModelForQBs, getLineChartViewModelForRBs, getLineChartViewModelForRecs } from '@pmt/fantalytic-shared';
import { getPosition, getSelectedPlayers, getSelectedRowData } from '../ngrx/selectors/fantasy-football.selectors';
import {forkJoin, take, map, Observable} from 'rxjs';


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
            const filteredRowData = selectedRowData?.filter((row) => {
              return selectedPlayers?.some(player => (row as QB).player === player);
            }) ?? [];
            return getLineChartViewModelForQBs(filteredRowData as QB[]);
          }
          case PositionTypes.RB: {
            const filteredRowData = selectedRowData?.filter(row => {
              return selectedPlayers?.some(player => player === (row as RB).player);
            }) ?? [];
            return getLineChartViewModelForRBs(filteredRowData as RB[]);
          }
          case PositionTypes.WR:
          case PositionTypes.TE: {
            const filteredRowData = selectedRowData?.filter(row => {
              return selectedPlayers?.some(player => (row as Receivers).player === player);
            }) ?? [];
            return getLineChartViewModelForRecs(filteredRowData as Receivers[]);
          }

          default:
            return undefined;
        }
      })
    )
  }
  
}
