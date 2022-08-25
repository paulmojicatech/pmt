import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PositionTypes } from '@pmt/fantalytic-shared';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { Observable } from 'rxjs';
import { DEFAULT_COL_DEF_SETTINGS } from '../const/grid.const';
import { FantasyFootballSidebarComponent } from './components/fantasy-football-sidebar/fantasy-football-sidebar.component';
import { FantasyFootballState } from './models/fantasy-football.interface';
import { setPositionType } from './ngrx/actions/fantasy-football.actions';
import { getFantasyFootballState } from './ngrx/selectors/fantasy-football.selectors';
@Component({
  selector: 'pmt-fantasy-football',
  standalone: true,
  imports: [
    CommonModule,
    AgGridModule,
    MatButtonModule,
    MatSidenavModule,
    FantasyFootballSidebarComponent
  ],
  templateUrl: './fantasy-football.component.html',
  styleUrls: ['./fantasy-football.component.scss']
})

export class FantasyFootballComponent implements OnInit {

  @ViewChild('statGrid')
  statGrid!: AgGridAngular;

  @ViewChild('drawer')
  drawer!: MatSidenav;

  fantasyFootballState$!: Observable<FantasyFootballState>;

  readonly DEFAULT_COL_DEF_SETTINGS = DEFAULT_COL_DEF_SETTINGS;

  constructor(private _store: Store<FantasyFootballState>, private _router: Router) {}
  
  ngOnInit(): void {
      this.fantasyFootballState$ = this._store.select(getFantasyFootballState);
  }

  gridReady(): void {
    this.statGrid.api.sizeColumnsToFit();
  }

  handleUpdatedRowSelected(): void {
    const selectedRows = this.statGrid.api.getSelectedNodes();
    if (selectedRows.length) {
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

}
