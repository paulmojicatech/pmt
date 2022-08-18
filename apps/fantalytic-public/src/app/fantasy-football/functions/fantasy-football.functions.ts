import { qbStats2019 } from '../../../assets/stats/2019_qb';
import { qbStats2020 } from '../../../assets/stats/2020_qb';
import {qbStats2018} from '../../../assets/stats/2018_qb';
import { qbStats2021 } from '../../../assets/stats/2021_qb';
import { rbStats2018 } from '../../../assets/stats/2018_rb';
import { rbStats2019 } from '../../../assets/stats/2019_rb';
import { rbStats2020 } from '../../../assets/stats/2020_rb';
import { rbStats2021 } from '../../../assets/stats/2021_rb';

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


