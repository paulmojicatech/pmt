import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import { ComponentStore } from '@ngrx/component-store';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { map, shareReplay } from 'rxjs';
import { FANTASY_FOOTBALL_INITIAL_STATE, FANTASY_FOOTBALL_RB_STATE, FANTASY_FOOTBALL_REC_STATE, FANTASY_FOOTBAL_DEF_RUSH_STATE } from './const/fantasy-football.const';
import { FantasyFootballState } from './models/fantasy-football.interface';
import {FantasyFootballSidebarComponent} from './components/fantasy-football-sidebar/fantasy-football-sidebar.component';
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
  styleUrls: ['./fantasy-football.component.scss'],
  providers: [ComponentStore]
})

export class FantasyFootballComponent implements OnInit {

  @ViewChild('statGrid')
  statGrid!: AgGridAngular;

  @ViewChild('drawer')
  drawer!: MatSidenav;

  gridConfig$ = this._componentStore.state$.pipe(
    map(state => state.gridConfig)
  );

  position$ = this._componentStore.state$.pipe(
    map(state => state.position),
    shareReplay(2)
  );

  rowData$ = this._componentStore.state$.pipe(
    map(state => state.rowData)
  );
  constructor(private _componentStore: ComponentStore<FantasyFootballState>) {}
  
  ngOnInit(): void {
      this._componentStore.setState(FANTASY_FOOTBALL_INITIAL_STATE);
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
    switch (position) {
      case 'RB':
        this._componentStore.setState(FANTASY_FOOTBALL_RB_STATE);
        break;
      case 'WR':
        this._componentStore.setState(FANTASY_FOOTBALL_REC_STATE);
        break;
      case 'DEF_RUSH':
        this._componentStore.setState(FANTASY_FOOTBAL_DEF_RUSH_STATE);
        break;
      default:
        this._componentStore.setState(FANTASY_FOOTBALL_INITIAL_STATE);
        break;
    }
  }

}
