import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'pmt-line-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  exportAs: 'pmt-line-chart'
})
export class LineChartComponent {
  
  @Input()
  lineChartConfig?: ChartConfiguration;

  @ViewChild(BaseChartDirective)
  myChart!: BaseChartDirective;
  
}
