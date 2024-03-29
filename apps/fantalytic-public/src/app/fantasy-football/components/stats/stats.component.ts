import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FantasyFootballState, PositionTypes } from '@pmt/fantalytic-shared';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { Observable, Subject } from 'rxjs';
import { DEFAULT_COL_DEF_SETTINGS } from '../../../const/grid.const';
import { setPositionType, updateSelectedPlayers, updateYearFilter } from '../../ngrx/actions/fantasy-football.actions';
import { getSelectedYear, getPosition, getFantasyFootballState } from '../../ngrx/selectors/fantasy-football.selectors';
import { MatButtonModule } from '@angular/material/button';
import { FantasyFootballSidebarComponent } from '../fantasy-football-sidebar/fantasy-football-sidebar.component';

@Component({
  selector: 'pmt-stats',
  standalone: true,
  imports: [ 
    CommonModule,
    AgGridModule,
    MatButtonModule,
    MatSidenavModule,
    FantasyFootballSidebarComponent,
  ],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit, OnDestroy {

  @ViewChild('statGrid')
  statGrid!: AgGridAngular;

  @ViewChild('drawer')
  drawer!: MatSidenav;

  fantasyFootballState$!: Observable<FantasyFootballState>;
  currentYear$ = this._store.select(getSelectedYear);
  currentPosition$ = this._store.select(getPosition);
  
  readonly DEFAULT_COL_DEF_SETTINGS = DEFAULT_COL_DEF_SETTINGS;
  readonly ALL_YEARS = [2018,2019,2020,2021,2022];

  private _compDestroyedSub$ = new Subject<void>();

  constructor(private _store: Store<FantasyFootballState>, private _router: Router) {}
  
  ngOnInit(): void {
      this._store.dispatch(setPositionType(PositionTypes.QB));
      this.fantasyFootballState$ = this._store.select(getFantasyFootballState);
  }

  ngOnDestroy(): void {
      this._compDestroyedSub$.next();
  }

  gridReady(): void {
    this.statGrid.api.sizeColumnsToFit();
  }

  handleUpdatedRowSelected(): void {
    const selectedPlayers = this.statGrid.api.getSelectedNodes().map(node => node.data.player);
    this._store.dispatch(updateSelectedPlayers(selectedPlayers));
    if (selectedPlayers.length) {
      this.drawer.open();
    } else {
      this.drawer.close();
    }
    
  }

  updatePosition(position: string): void {
    this.drawer.close();
    this._store.dispatch(setPositionType(position as PositionTypes));
  }

  handleSidebarEvent(path: string): void {
    this._router.navigate(['fantasy-football', path]);
  }

  filterByYear(year: number): void {
    this._store.dispatch(updateYearFilter(year));
  }
}
