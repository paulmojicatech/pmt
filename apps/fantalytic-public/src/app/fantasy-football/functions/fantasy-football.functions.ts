import { qbStats2019 } from '../../../assets/stats/2019_qb';
import { qbStats2020 } from '../../../assets/stats/2020_qb';
import {qbStats2018} from '../../../assets/stats/2018_qb';


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
    return [...stats2018, ...stats2019, ...stats2020];
}


