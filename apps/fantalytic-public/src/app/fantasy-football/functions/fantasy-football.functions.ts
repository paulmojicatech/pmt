/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChartDataset } from 'chart.js';
import { defRush2018 } from '../../../assets/stats/2018_def_rush';
import { qbStats2018 } from '../../../assets/stats/2018_qb';
import { rbStats2018 } from '../../../assets/stats/2018_rb';
import { recStats2018 } from '../../../assets/stats/2018_wr_te';
import { defRush2019 } from '../../../assets/stats/2019_def_rush';
import { qbStats2019 } from '../../../assets/stats/2019_qb';
import { rbStats2019 } from '../../../assets/stats/2019_rb';
import { recStats2019 } from '../../../assets/stats/2019_wr_te';
import { defRush2020 } from '../../../assets/stats/2020_def_rush';
import { qbStats2020 } from '../../../assets/stats/2020_qb';
import { rbStats2020 } from '../../../assets/stats/2020_rb';
import { recStats2020 } from '../../../assets/stats/2020_wr_te';
import { defRush2021 } from '../../../assets/stats/2021_def_rush';
import { qbStats2021 } from '../../../assets/stats/2021_qb';
import { rbStats2021 } from '../../../assets/stats/2021_rb';
import { recStats2021 } from '../../../assets/stats/2021_wr_te';
import {parseQBStats} from '@pmt/fantalytic-shared';
import { LineChartViewModel } from '../../components/line-chart/models/line-chart.interface';

//#region QB Stats
export function getQbRowData(): {[key: string]: number | string}[] {
    const stats2018 = parseQBStats(qbStats2018, 2018) as any[];
    const stats2019 = parseQBStats(qbStats2019, 2019) as any[];
    const stats2020 = parseQBStats(qbStats2020, 2020) as any[];
    const stats2021 = parseQBStats(qbStats2021, 2021) as any[];
    return [...stats2018, ...stats2019, ...stats2020, ...stats2021];
}

export function getLineChartViewModelForQBs(qbStats: {[key: string]: number | string}[]): LineChartViewModel {
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
export function getRbRowData(): {[key: string]: number | string}[] {
    const stats2018 = rbStats2018.map(stat => {
        return {
            player: stat.player.value,
            year: 2018,
            rushingYds: stat.rushingYds.value,
            rushAttempts: stat.rushAttempts.value,
            rushingTds: stat.rushingTds.value,
            rushing20Yds: stat.rushing20Yds.value
        };
    });
    const stats2019 = rbStats2019.map(stat => {
        return {
            player: stat.player.value,
            year: 2019,
            rushingYds: stat.rushingYds.value,
            rushAttempts: stat.rushAttempts.value,
            rushingTds: stat.rushingTds.value,
            rushing20Yds: stat.rushing20Yds.value
        };
    });
    const stats2020 = rbStats2020.map(stat => {
        return {
            player: stat.player.value,
            year: 2020,
            rushingYds: stat.rushingYds.value,
            rushAttempts: stat.rushAttempts.value,
            rushingTds: stat.rushingTds.value,
            rushing20Yds: stat.rushing20Yds.value
        };
    });
    const stats2021 = rbStats2021.map(stat => {
        return {
            player: stat.player.value,
            year: 2021,
            rushingYds: stat.rushingYds.value,
            rushAttempts: stat.rushAttempts.value,
            rushingTds: stat.rushingTds.value,
            rushing20Yds: stat.rushing20Yds.value
        };
    });
    console.log('RBs', JSON.stringify(stats2021));
    return [...stats2018, ...stats2019, ...stats2020, ...stats2021];
}

export function getLineChartViewModelForRBs(rbStats: {[key: string]: number | string}[]): LineChartViewModel {
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
export function getWrTeRowData(): {[key: string]: number | string}[] {
    const stats2018 = recStats2018.map(stat => {
        return {
            player: stat.player.value,
            year: 2018,
            receptions: stat.receptions.value,
            receivingYds: stat.receivingYds.value,
            receivingTds: stat.receivingTds.value,
            receiving20Plus: stat.receiving20Plus.value,
            receiving40Plus: stat.receiving40Plus?.value ?? 0,
            receivingTargets: stat.receivingTargets.value
        };
    });
    const stats2019 = recStats2019.map(stat => {
        return {
            player: stat.player.value,
            year: 2019,
            receptions: stat.receptions.value,
            receivingYds: stat.receivingYds.value,
            receivingTds: stat.receivingTds.value,
            receiving20Plus: stat.receiving20Plus.value,
            receiving40Plus: stat.receiving40Plus?.value ?? 0,
            receivingTargets: stat.receivingTargets.value
        };
    });
    const stats2020 = recStats2020.map(stat => {
        return {
            player: stat.player.value,
            year: 2020,
            receptions: stat.receptions.value,
            receivingYds: stat.receivingYds.value,
            receivingTds: stat.receivingTds.value,
            receiving20Plus: stat.receiving20Plus.value,
            receiving40Plus: stat.receiving40Plus?.value ?? 0,
            receivingTargets: stat.receivingTargets.value
        };
    });
    const stats2021 = recStats2021.map(stat => {
        return {
            player: stat.player.value,
            year: 2021,
            receptions: stat.receptions.value,
            receivingYds: stat.receivingYds.value,
            receivingTds: stat.receivingTds.value,
            receiving20Plus: stat.receiving20Plus.value,
            receiving40Plus: stat.receiving40Plus?.value ?? 0,
            receivingTargets: stat.receivingTargets.value
        };
    });

    return [...stats2018, ...stats2019, ...stats2020, ...stats2021];
}

export function getLineChartViewModelForRecs(recStats: {[key: string]: number | string}[]): LineChartViewModel {
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
export function getDefRushRowData(): {[key: string]: string | number}[] {
    const stats2018 = defRush2018.map(stat => {
        return {
            team: stat.team.value,
            year: 2018,
            rushYds: stat.rushYds.value,
            ypc: stat.ypc.value,
            td: stat.td.value
        };
    });

    const stats2019 = defRush2019.map(stat => {
        return {
            team: stat.team.value,
            year: 2019,
            rushYds: stat.rushYds.value,
            ypc: stat.ypc.value,
            td: stat.td.value
        };
    });

    const stats2020 = defRush2020.map(stat => {
        return {
            team: stat.team.value,
            year: 2020,
            rushYds: stat.rushYds.value,
            ypc: stat.ypc.value,
            td: stat.td.value
        };
    });

    const stats2021 = defRush2021.map(stat => {
        return {
            team: stat.team.value,
            year: 2021,
            rushYds: stat.rushYds.value,
            ypc: stat.ypc.value,
            td: stat.td.value
        };
    });

    return [...stats2018, ...stats2019, ...stats2020, ...stats2021];
}
//#endregion

