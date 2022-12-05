export const RB_STATS = {
    url: 'https://www.nfl.com/stats/player-stats/category/rushing/{year}/REG/all/rushingyards/desc',
    player: {
        statSelector: {
            statColIndex: 0,
            statName: 'd3-o-player-fullname'
        }
    },
    imageUrl: {
        statSelector: {
            statColIndex: 0,
            statName: 'img-responsive'
        }
    },
    rushingYds: {
        statSelector: {
            statColIndex: 1,
            statName: 'rushingyards'

        }
    },
    rushingAttempts: {
        statSelector: {
            statColIndex: 2,
            statName: 'rushingattempts'
        }
    },
    rushingTds: {
        statSelector: {
            statColIndex: 3,
            statName: 'rushingtouchdowns'
        }
    },
    rushing20Yds: {
        statSelector: {
            statColIndex: 4,
            statName: 'rushing20plusyardseach'
        }
    },
    rushing40Yds: {
        statSelector: {
            statColIndex: 5,
            statName: 'rushing40plusyardseach'
        }
    }
}