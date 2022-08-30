import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PositionTypes } from '@pmt/fantalytic-shared';
import { map, Observable } from 'rxjs';
import { LineChartComponent } from '../../../components/line-chart/line-chart.component';
import { LineChartViewModel } from '../../../components/line-chart/models/line-chart.interface';
import { FantasyFootballState } from '../../models/fantasy-football.interface';
import { getPosition } from '../../ngrx/selectors/fantasy-football.selectors';
import { FantasyFootballLineChartService } from '../../services/fantasy-football-line-chart.service';

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
