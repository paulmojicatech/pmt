import { IDefRusingStats } from "../../../fantalytic-shared/src/lib/models/fantalytic.interface";

export const DEF_RUSH_STATS: IDefRusingStats = {
    url: 'https://www.nfl.com/stats/team-stats/defense/rushing/2021/reg/all',
    team: {
        statSelector: {
            statColIndex: 0,
            statName: 'd3-o-club-fullname'
        }
    },
    rushYds: {
        statSelector: {
            statColIndex: 2,
            statName: 'rushyards'
        }
    },
    ypc: {
        statSelector: {
            statColIndex: 3,
            statName: 'ypc'
        }
    },
    td: {
        statSelector: {
            statColIndex: 4,
            statName: 'rushtds'
        }
    }
}