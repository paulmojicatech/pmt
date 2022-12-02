import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PositionTypes, FantasyFootballState, LineChartViewModel } from '@pmt/fantalytic-shared';
import { getPosition } from '../../ngrx/selectors/fantasy-football.selectors';
import { map, Observable } from 'rxjs';
import { FantasyFootballLineChartService } from '../../services/fantasy-football-line-chart.service'
import { LineChartComponent } from '../../../components/chartjs/line-chart/line-chart.component';

@Component({
  selector: 'pmt-compare-players',
  standalone: true,
  imports: [CommonModule, MatIconModule, LineChartComponent],
  templateUrl: './compare-players.component.html',
  styleUrls: ['./compare-players.component.scss'],
})
export class ComparePlayersComponent implements OnInit {
  constructor(private _router: Router, private _lineChartSvc: FantasyFootballLineChartService, private _store: Store<FantasyFootballState>) {}

  lineChartViewModel$?: Observable<LineChartViewModel | undefined>;
  headerContent$!: Observable<string>;

  ngOnInit(): void {
    this.lineChartViewModel$ = this._lineChartSvc.getLineChartViewModel();
    this.headerContent$ = this._store.select(getPosition).pipe(
      map(position => {
        switch (position) {
          case PositionTypes.QB:
            return 'QB Stats';
          case PositionTypes.RB:
            return 'RB Stats';
          case PositionTypes.WR:
          case PositionTypes.TE: {
            return 'Receiving Stats';
          }
          default:
            return '';
        }
      })
    )
  }

  goBack(): void {
    this._router.navigate(['fantasy-football']);
  }

}
