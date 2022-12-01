import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { LineChartViewModel } from './models/line-chart.interface';

@Component({
  selector: 'pmt-line-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  exportAs: 'pmt-line-chart'
})
export class LineChartComponent implements OnInit {
  
  @Input()
  lineChartViewModel?: LineChartViewModel;

  @Input()
  height?: string;

  @ViewChild(BaseChartDirective)
  myChart!: BaseChartDirective;

  ngOnInit(): void {
    //this.myChart.options.
    console.log('TEST', this.myChart);
  }
  
}
