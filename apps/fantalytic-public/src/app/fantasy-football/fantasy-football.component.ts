import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import {AgGridAngular, AgGridModule} from 'ag-grid-angular';
import {ComponentStore} from '@ngrx/component-store';
import { FantasyFootballState } from './models/fantasy-football.interface';
import { FANTASY_FOOTBALL_INITIAL_STATE } from './const/fantasy-football.const';
import { map } from 'rxjs';

@Component({
  selector: 'pmt-fantasy-football',
  standalone: true,
  imports: [
    CommonModule,
    AgGridModule
  ],
  templateUrl: './fantasy-football.component.html',
  styleUrls: ['./fantasy-football.component.scss'],
  providers: [ComponentStore]
})

export class FantasyFootballComponent implements OnInit {

  @ViewChild('statGrid')
  statGrid!: AgGridAngular;

  gridConfig$ = this._componentStore.state$.pipe(
    map(state => state.gridConfig)
  );

  position$ = this._componentStore.state$.pipe(
    map(state => state.position)
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

}
