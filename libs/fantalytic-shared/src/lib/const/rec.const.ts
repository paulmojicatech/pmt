export const WR_TE_STATS = {
    url: "https://www.nfl.com/stats/player-stats/category/receiving/{year}/REG/all/receivingreceptions/desc",
    player: {
      statSelector: {
        statColIndex: 0,
        statName: "d3-o-player-fullname",
        statLabel: "Player",
      },
    },
    receptions: {
      statSelector: {
        statColIndex: 1,
        statName: "receivingreceptions",
        statLabel: "Receptions",
      },
    },
    receivingYds: {
      statSelector: {
        statColIndex: 2,
        statName: "receivingyards",
        statLabel: "Receiving Yards",
      },
    },
    receivingTds: {
      statSelector: {
        statColIndex: 3,
        statName: "receivingtouchdowns",
        statLabel: "Receivng TDs",
      },
    },
    receiving20PlusYds: {
      statSelector: {
        statColIndex: 4,
        statName: "receiving20plusyardseach",
        statLabel: "20+ yard receptions",
      },
    },
    receiving40PlusYds: {
      statSelector: {
        statColIndex: 5,
        statName: "receiving40plusyardseach",
        statLabel: "40+ yard receptions",
      },
    },
    receivingTargets: {
      statSelector: {
        statColIndex: 11,
        statName: "receivingtarget",
        statLabel: "Receiving targets",
      },
    },
  };
  