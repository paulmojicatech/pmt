/* eslint-disable @typescript-eslint/no-explicit-any */
import { QB, RB, Receivers } from '../../models/fantalytic.interface';
import { ChartDataset } from 'chart.js';
import { LineChartViewModel } from '../../models/chartjs/line-chart.interface';

//#region QB Stats

export function getLineChartViewModelForQBs(qbStats: QB[]): LineChartViewModel {
    const vm: LineChartViewModel = {
        labels: ['Passing Yards Per Attempt', 'Interceptions', 'Touchdowns', 'Passing Yards (in hundreds)'],
        datasets: 
            qbStats.map((qb) => {
                return {
                    label: qb.player,
                    fill: false,
                    data: [
                        qb.passingYdsPerAttempt,
                        qb.ints,
                        qb.tds,
                        qb.passingYds / 100,
                    ]
                };
            }) as ChartDataset[],
        options: {
            scales: {
                x: {
                    ticks: {
                        font: {
                            size: 18
                        }
                    }
                },
                y: {
                    ticks: {
                        font: {
                            size: 18
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        boxHeight: 0
                    }
                }
            }
        }
    };
    return vm;
}

//#endregion

//#region RB Stats
export function getLineChartViewModelForRBs(rbStats: RB[]): LineChartViewModel {
    const vm: LineChartViewModel = {
        labels: ['Rushing Attempts (in hundreds)', 'Rushes Over 20 Yards','Touchdowns', 'Rushing Yards (in hundreds)'],
        datasets: 
            rbStats.map((rb) => {
                return {
                    label: rb['player'],
                    fill: false,
                    data: [
                        rb.rushAttempts / 100,
                        rb.rushing20Yds,
                        rb.rushingTds,
                        rb.rushingYds / 100,
                    ]
                };
            }) as ChartDataset[],
        options: {
            plugins: {
                legend: {
                    labels: {
                        boxHeight: 0
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        font: {
                            size: 18
                        }
                    }
                },
                y: {
                    ticks: {
                        font: {
                            size: 18
                        }
                    }
                }
            }
        }
    };
    return vm;
}
//#endregion

//#region WR / TE Stats
export function getLineChartViewModelForRecs(recStats: Receivers[]): LineChartViewModel {
    const vm: LineChartViewModel = {
        labels: ['Receptions Over 20 Yards', 'Receptions Over 40 Yards','Touchdowns', 'Receptions', 'Receiving Yards (in hundreds)', 'Number of Targets'],
        datasets: 
            recStats.map((rec) => {
                return {
                    fill: false,
                    label: rec['player'],
                    data: [
                        rec.receiving20Plus,
                        rec.receiving40Plus,
                        rec.receivingTds,
                        rec.receptions,
                        rec.receivingYds / 100,
                        rec.receivingTargets
                    ]
                };
            }) as ChartDataset[],
        options: {
            plugins: {
                legend: {
                    labels: {
                        boxHeight: 0
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        font: {
                            size: 18
                        }
                    }
                },
                y: {
                    ticks: {
                        font: {
                            size: 18
                        }
                    }
                }
            }
        }
    };
    return vm;
}

//#endregion

//#region DEF Stats

//#endregion

