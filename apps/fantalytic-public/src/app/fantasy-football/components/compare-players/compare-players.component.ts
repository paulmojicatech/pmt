import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ChartConfiguration, ChartDataset } from 'chart.js';
import { Observable } from 'rxjs';
import { LineChartComponent } from '../../../components/line-chart/line-chart.component';
import { LineChartViewModel } from '../../../components/line-chart/models/line-chart.interface';
import { FantasyFootballState } from '../../models/fantasy-football.interface';
import { FantasyFootballLineChartService } from '../../services/fantasy-football-line-chart.service';

@Component({
  selector: 'pmt-compare-players',
  standalone: true,
  imports: [CommonModule, MatIconModule, LineChartComponent],
  templateUrl: './compare-players.component.html',
  styleUrls: ['./compare-players.component.scss'],
})
export class ComparePlayersComponent implements OnInit {
  constructor(private _router: Router, private _lineChartSvc: FantasyFootballLineChartService) {}

  lineChartViewModel$?: Observable<LineChartViewModel | undefined>;

  ngOnInit(): void {
    this.lineChartViewModel$ = this._lineChartSvc.getLineChartViewModel();
  }

  goBack(): void {
    this._router.navigate(['fantasy-football']);
  }

}
