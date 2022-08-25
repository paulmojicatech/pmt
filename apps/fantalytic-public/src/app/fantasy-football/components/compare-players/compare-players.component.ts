import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { LineChartComponent } from '../../../components/line-chart/line-chart.component';

@Component({
  selector: 'pmt-compare-players',
  standalone: true,
  imports: [CommonModule, MatIconModule, LineChartComponent],
  templateUrl: './compare-players.component.html',
  styleUrls: ['./compare-players.component.scss'],
})
export class ComparePlayersComponent {
  constructor(private _router: Router) {}

  TEST_CONFIG: ChartConfiguration = {
    data: {
      datasets: [
        {
          label: 'My Data Point',
          data: [
            {
              x: 1,
              y: 100
            }
          ]
        }
      ]
    },
    type: 'line'
  }

  goBack(): void {
    this._router.navigate(['fantasy-football']);
  }

}
