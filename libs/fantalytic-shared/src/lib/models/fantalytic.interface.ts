export interface IQB {
    position: PositionTypes;
    stats: IQBStats;
}

export enum PositionTypes {
    QB = 'QB',
    RB = 'RB',
    WR = 'WR',
    TE = 'TE',
    DEF_RUSH = 'DEF_RUSH',
    DEF_PASS = 'DEF_PASS',
    DEF = 'DEF',
    UNKNOWN = 'UNKNOWN'
}

export interface IQBStats {
    url: string;
    player: {
        statSelector: IStatPosition;
        value?: string;
    };
    passingYds: {
        statSelector: IStatPosition;
        value?: number;
    };
    ints: {
        statSelector: IStatPosition;
        value?: number;
    };
    tds: {
        statSelector: IStatPosition;
        value?: number;
    };
    passingYdsPerAttempt: {
        statSelector: IStatPosition;
        value?: number;
    };
}

export interface IStatPosition {
    statName: string;
    statColIndex: number;
}

export interface IRB {
    position: PositionTypes;
    stats: IRBStats;
}

export interface IRBStats {
    url: string;
    player: {
        statSelector: IStatPosition;
        value?: string;
    };
    rushingYds: {
        statSelector: IStatPosition;
        value?: number;
    };
    rushAttempts: {
        statSelector: IStatPosition;
        value?: number;
    };
    rushingTds: {
        statSelector: IStatPosition;
        value?: number;
    };
    rushing20Yds: {
        statSelector: IStatPosition;
        value?: number;
    };
    rushing40Yds: {
        statSelector: IStatPosition;
        value?: number;
    };
}

export interface IWRTEStats {
  url: string;
  player: {
    statSelector: IStatPosition;
    value?: string;
  };
  receptions: {
    statSelector: IStatPosition;
    value?: number;
  };
  receivingYds: {
    statSelector: IStatPosition;
    value?: number;
  };
  receivingTds: {
    statSelector: IStatPosition;
    value?: number;
  };
  receiving20Plus: {
    statSelector: IStatPosition;
    value?: number;
  };
  receiving40Plus: {
      statSelector: IStatPosition;
      value?: number;
  };
  receivingTargets: {
      statSelector: IStatPosition;
      value?: number;
  };
}

export interface IDefRusingStats {
    url: string;
    team: {
        statSelector: IStatPosition;
        value?: string;
    };
    rushYds: {
        statSelector: IStatPosition;
        value?: number;
    };
    ypc: {
        statSelector: IStatPosition;
        value?: number;
    };
    td: {
        statSelector: IStatPosition;
        value?: number;
    };
    imageUrl: {
        statSelector: IStatPosition;
        value?: string;
    }

}

export interface IDefPassingStats {
    url: string;
    team: {
        statSelector: IStatPosition;
        value?: string;
    };
    imageUrl: {
        statSelector: IStatPosition;
        value?: string;
    };
    compPct: {
        statSelector: IStatPosition;
        value?: number;
    };
    yds: {
        statSelector: IStatPosition;
        value?: number;
    };
    td: {
        statSelector: IStatPosition;
        value?: number;
    };
    int: {
        statSelector: IStatPosition;
        value?: number;
    };
    sacks: {
        statSelector: IStatPosition;
        value?: number;
    };
}

export interface QB {
    player: string;
    year: number;
    passingYds: number;
    ints: number;
    passingYdsPerAttempt: number;
    tds: number;
    week?: number;
}

export interface RB {
    player: string;
    rushingYds: number;
    rushAttempts: number;
    rushingTds: number;
    rushing20Yds: number;
    year: number;
    week: number;
}

export interface Receivers {
    player: string;
    receptions: number;
    receivingYds: number;
    receivingTds: number;
    receiving20Plus: number;
    receiving40Plus: number;
    receivingTargets: number;
    year: number;
    week: number;
}

export interface Defense {
    team: string;
    rushYdsAllowed: number;
    ydsPerCarry: number;
    rushTdsAllowed: number;
    completionPctAllowed: number;
    passYdsAllowed: number;
    ints: number;
    sacks: number;
    week: number;
    year: number;
    imageUrl: string;
}