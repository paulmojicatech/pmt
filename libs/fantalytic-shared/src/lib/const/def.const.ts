import { IDefRusingStats, IDefPassingStats } from "../models/fantalytic.interface";

export const DEF_RUSH_STATS: IDefRusingStats = {
    url: 'https://www.nfl.com/stats/team-stats/defense/rushing/{year}/reg/all',
    team: {
        statSelector: {
            statColIndex: 0,
            statName: 'd3-o-club-fullname'
        }
    },
    imageUrl: {
        statSelector: {
            statColIndex: 0,
            statName: 'img-responsive'

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

export const DEF_PASS_STATS: IDefPassingStats = {
    url: 'https://www.nfl.com/stats/team-stats/defense/passing/{year}/reg/all',
    team: {
        statSelector: {
            statColIndex: 0,
            statName: 'd3-o-club-fullname'
        }
    },
    imageUrl: {
        statSelector: {
            statColIndex: 0,
            statName: 'img-responsive'
        }
    },
    compPct: {
        statSelector: {
            statColIndex: 3,
            statName: 'comppct'
        }
    },
    yds: {
        statSelector: {
            statColIndex: 5,
            statName: 'yds'
        }
    },
    td: {
        statSelector: {
            statColIndex: 6,
            statName: 'td'
        }
    },
    int: {
        statSelector: {
            statColIndex: 7,
            statName: 'int'
        }
    },
    sacks: {
        statSelector: {
            statColIndex: 10,
            statName: 'sacks'
        }
    }
};