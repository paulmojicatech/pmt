import { qbStats2019 } from '../../../assets/stats/2019_qb';
import { qbStats2020 } from '../../../assets/stats/2020_qb';
import {qbStats2018} from '../../../assets/stats/2018_qb';
import { qbStats2021 } from '../../../assets/stats/2021_qb';
import { rbStats2018 } from '../../../assets/stats/2018_rb';
import { rbStats2019 } from '../../../assets/stats/2019_rb';
import { rbStats2020 } from '../../../assets/stats/2020_rb';
import { rbStats2021 } from '../../../assets/stats/2021_rb';
import { recStats2018 } from '../../../assets/stats/2018_wr_te';
import { recStats2019 } from '../../../assets/stats/2019_wr_te';
import { recStats2020 } from '../../../assets/stats/2020_wr_te';
import { recStats2021 } from '../../../assets/stats/2021_wr_te';
import { defRush2018 } from '../../../assets/stats/2018_def_rush';
import { defRush2019 } from '../../../assets/stats/2019_def_rush';
import { defRush2020 } from '../../../assets/stats/2020_def_rush';
import { defRush2021 } from '../../../assets/stats/2021_def_rush';

//#region QB Stats
export function getQbRowData(): {[key: string]: number | string}[] {
    const stats2018 = qbStats2018.map(stat => {
        return {
            player: stat.player.value,
            year: 2018,
            passingYds: stat.passingYds.value,
            tds: stat.tds.value,
            passingYdsPerAttempt: stat.passingYdsPerAttempt.value,
            ints: stat.ints.value
        }
    });
    const stats2019 = qbStats2019.map(stat => {
        return {
            player: stat.player.value,
            year: 2019,
            passingYds: stat.passingYds.value,
            tds: stat.tds.value,
            passingYdsPerAttempt: stat.passingYdsPerAttempt.value,
            ints: stat.ints.value
        }
    });
    const stats2020 = qbStats2020.map(stat => {
        return {
            player: stat.player.value,
            year: 2020,
            passingYds: stat.passingYds.value,
            tds: stat.tds.value,
            passingYdsPerAttempt: stat.passingYdsPerAttempt.value,
            ints: stat.ints.value
        }
    });
    const stats2021 = qbStats2021.map(stat => {
        return {
            player: stat.player.value,
            year: 2021,
            passingYds: stat.passingYds.value,
            tds: stat.tds.value,
            passingYdsPerAttempt: stat.passingYdsPerAttempt.value,
            ints: stat.ints.value
        }
    });
    return [...stats2018, ...stats2019, ...stats2020, ...stats2021];
}
//#endregion

//#region RB Stats
export function getRbRowData(): {[key: string]: number | string}[] {
    const stats2018 = rbStats2018.map(stat => {
        return {
            player: stat.player.value,
            year: 2018,
            rushingYds: stat.rushingYds.value,
            rushingYdsPerAttempt: stat.rushingYdsPerAttempt.value,
            rushingTds: stat.rushingTds.value,
            rushing20Yds: stat.rushing20Yds.value
        };
    });
    const stats2019 = rbStats2019.map(stat => {
        return {
            player: stat.player.value,
            year: 2019,
            rushingYds: stat.rushingYds.value,
            rushingYdsPerAttempt: stat.rushingYdsPerAttempt.value,
            rushingTds: stat.rushingTds.value,
            rushing20Yds: stat.rushing20Yds.value
        };
    });
    const stats2020 = rbStats2020.map(stat => {
        return {
            player: stat.player.value,
            year: 2020,
            rushingYds: stat.rushingYds.value,
            rushingYdsPerAttempt: stat.rushingYdsPerAttempt.value,
            rushingTds: stat.rushingTds.value,
            rushing20Yds: stat.rushing20Yds.value
        };
    });
    const stats2021 = rbStats2021.map(stat => {
        return {
            player: stat.player.value,
            year: 2021,
            rushingYds: stat.rushingYds.value,
            rushingYdsPerAttempt: stat.rushingYdsPerAttempt.value,
            rushingTds: stat.rushingTds.value,
            rushing20Yds: stat.rushing20Yds.value
        };
    });
    return [...stats2018, ...stats2019, ...stats2020, ...stats2021];
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

