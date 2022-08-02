import { IQBStats } from "../qb.interface";

export const QB_STATS: IQBStats = {
    url: 'https://www.nfl.com/stats/player-stats/category/passing/{year}/REG/all/passingyards/DESC',
    player: {
        statSelector: {
            statColIndex: 0,
            statName: 'd3-o-player-fullname'
        }
    },
    passingYds: {
        statSelector: {
            statColIndex: 1,
            statName: 'passingyards'
        }
    },
    passingYdsPerAttempt: {
        statSelector: {
            statColIndex: 2,
            statName: 'passingaverageyards'
        }
    },
    tds: {
        statSelector: {
            statColIndex: 6,
            statName: 'passingtouchdowns'
        }
    },
    ints: {
        statSelector: {
            statColIndex: 7,
            statName: 'passinginterceptions'
        }
    }
}