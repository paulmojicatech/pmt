/* eslint-disable @typescript-eslint/no-explicit-any */
import { QB, RB, Receivers } from '@pmt/fantalytic-shared';
import { ChartDataset } from 'chart.js';
import { LineChartViewModel } from '../../components/line-chart/models/line-chart.interface';

//#region QB Stats

export function getLineChartViewModelForQBs(qbStats: QB[]): LineChartViewModel {
    const vm: LineChartViewModel = {
        labels: ['Passing Yards (in hundreds)', 'Touchdowns', 'Passing Yards Per Attempt', 'Interceptions'],
        datasets: 
            qbStats.map((qb) => {
                return {
                    label: qb['player'],
                    data: [
                        +qb['passingYds'] / 100,
                        qb['tds'],
                        qb['passingYdsPerAttempt'],
                        qb['ints']
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
            }
        }
    };
    return vm;
}

//#endregion

//#region RB Stats
// export function getRbRowData(): FantasyFootballRowData[] {
//     const stats2018 = rbStats2018.map(stat => {
//         return {
//             player: stat.player.value,
//             year: 2018,
//             rushingYds: stat.rushingYds.value,
//             rushAttempts: stat.rushAttempts.value,
//             rushingTds: stat.rushingTds.value,
//             rushing20Yds: stat.rushing20Yds.value
//         };
//     });
//     const stats2019 = rbStats2019.map(stat => {
//         return {
//             player: stat.player.value,
//             year: 2019,
//             rushingYds: stat.rushingYds.value,
//             rushAttempts: stat.rushAttempts.value,
//             rushingTds: stat.rushingTds.value,
//             rushing20Yds: stat.rushing20Yds.value
//         };
//     });
//     const stats2020 = rbStats2020.map(stat => {
//         return {
//             player: stat.player.value,
//             year: 2020,
//             rushingYds: stat.rushingYds.value,
//             rushAttempts: stat.rushAttempts.value,
//             rushingTds: stat.rushingTds.value,
//             rushing20Yds: stat.rushing20Yds.value
//         };
//     });
//     const stats2021 = rbStats2021.map(stat => {
//         return {
//             player: stat.player.value,
//             year: 2021,
//             rushingYds: stat.rushingYds.value,
//             rushAttempts: stat.rushAttempts.value,
//             rushingTds: stat.rushingTds.value,
//             rushing20Yds: stat.rushing20Yds.value
//         };
//     });
//     console.log('RBs', JSON.stringify(stats2021));
//     return [...stats2018, ...stats2019, ...stats2020, ...stats2021];
// }

export function getLineChartViewModelForRBs(rbStats: RB[]): LineChartViewModel {
    const vm: LineChartViewModel = {
        labels: ['Rushing Yards (in hundreds)', 'Touchdowns', 'Rushing Attempts (in hundreds)', 'Rushes Over 20 Yards'],
        datasets: 
            rbStats.map((rb) => {
                return {
                    label: rb['player'],
                    data: [
                        +rb['rushingYds'] / 100,
                        +rb['rushingTds'],
                        +rb['rushAttempts'] / 100,
                        +rb['rushing20Yds']
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
            }
        }
    };
    return vm;
}
//#endregion

//#region WR / TE Stats
// export function getWrTeRowData(): FantasyFootballRowData[] {
    // const stats2018 = recStats2018.map(stat => {
    //     return {
    //         player: stat.player.value,
    //         year: 2018,
    //         receptions: stat.receptions.value,
    //         receivingYds: stat.receivingYds.value,
    //         receivingTds: stat.receivingTds.value,
    //         receiving20Plus: stat.receiving20Plus.value,
    //         receiving40Plus: stat.receiving40Plus?.value ?? 0,
    //         receivingTargets: stat.receivingTargets.value
    //     };
    // });
    // const stats2019 = recStats2019.map(stat => {
    //     return {
    //         player: stat.player.value,
    //         year: 2019,
    //         receptions: stat.receptions.value,
    //         receivingYds: stat.receivingYds.value,
    //         receivingTds: stat.receivingTds.value,
    //         receiving20Plus: stat.receiving20Plus.value,
    //         receiving40Plus: stat.receiving40Plus?.value ?? 0,
    //         receivingTargets: stat.receivingTargets.value
    //     };
    // });
    // const stats2020 = recStats2020.map(stat => {
    //     return {
    //         player: stat.player.value,
    //         year: 2020,
    //         receptions: stat.receptions.value,
    //         receivingYds: stat.receivingYds.value,
    //         receivingTds: stat.receivingTds.value,
    //         receiving20Plus: stat.receiving20Plus.value,
    //         receiving40Plus: stat.receiving40Plus?.value ?? 0,
    //         receivingTargets: stat.receivingTargets.value
    //     };
    // });
    // const stats2021 = recStats2021.map(stat => {
    //     return {
    //         player: stat.player.value,
    //         year: 2021,
    //         receptions: stat.receptions.value,
    //         receivingYds: stat.receivingYds.value,
    //         receivingTds: stat.receivingTds.value,
    //         receiving20Plus: stat.receiving20Plus.value,
    //         receiving40Plus: stat.receiving40Plus?.value ?? 0,
    //         receivingTargets: stat.receivingTargets.value
    //     };
    // });

    // return [...stats2018, ...stats2019, ...stats2020, ...stats2021];
// }

export function getLineChartViewModelForRecs(recStats: Receivers[]): LineChartViewModel {
    const vm: LineChartViewModel = {
        labels: ['Receptions', 'Receiving Yards (in hundreds)', 'Touchdowns', 'Receptions Over 20 Yards', 'Receptions Over 40 Yards', 'Number of Targets'],
        datasets: 
            recStats.map((rec) => {
                return {
                    label: rec['player'],
                    data: [
                        +rec['receptions'],
                        +rec['receivingYds'] / 100,
                        +rec['receivingTds'],
                        +rec['receiving20Plus'],
                        +rec['receiving40Plus'],
                        +rec['receivingTargets']
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
            }
        }
    };
    return vm;
}

//#endregion

//#region DEF Stats
// export function getDefRushRowData(): FantasyFootballRowData[] {
//     const stats2018 = defRush2018.map(stat => {
//         return {
//             team: stat.team.value,
//             year: 2018,
//             rushYds: stat.rushYds.value,
//             ypc: stat.ypc.value,
//             td: stat.td.value
//         };
//     });

//     const stats2019 = defRush2019.map(stat => {
//         return {
//             team: stat.team.value,
//             year: 2019,
//             rushYds: stat.rushYds.value,
//             ypc: stat.ypc.value,
//             td: stat.td.value
//         };
//     });

//     const stats2020 = defRush2020.map(stat => {
//         return {
//             team: stat.team.value,
//             year: 2020,
//             rushYds: stat.rushYds.value,
//             ypc: stat.ypc.value,
//             td: stat.td.value
//         };
//     });

//     const stats2021 = defRush2021.map(stat => {
//         return {
//             team: stat.team.value,
//             year: 2021,
//             rushYds: stat.rushYds.value,
//             ypc: stat.ypc.value,
//             td: stat.td.value
//         };
//     });

//     return [...stats2018, ...stats2019, ...stats2020, ...stats2021];
// }
//#endregion

