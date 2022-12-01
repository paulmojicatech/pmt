import { ChartDataset, ChartOptions } from "chart.js";

export interface LineChartViewModel {
    datasets: ChartDataset[];
    labels: string[];
    options: ChartOptions;
}