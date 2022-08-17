import {qbStats2018} from '../../../assets/stats/2018_qb';


export function getQbRowData(): {[key: string]: number | string}[] {
    return qbStats2018.map(stat => {
        return {
            player: stat.player.value,
            year: 2018,
            passingYds: stat.passingYds.value,
            tds: stat.tds.value,
            passingYdsPerAttempt: stat.passingYdsPerAttempt.value,
            ints: stat.ints.value
        }
    }).sort((prev, next) => {
        if (prev.passingYds > next.passingYds) {
            return -1;
        }
        return 1;
    });
}


