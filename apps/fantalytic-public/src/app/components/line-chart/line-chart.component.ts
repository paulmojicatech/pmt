import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'pmt-line-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent {
  
  @ViewChild(BaseChartDirective)
  myChart!: BaseChartDirective;
  
}
