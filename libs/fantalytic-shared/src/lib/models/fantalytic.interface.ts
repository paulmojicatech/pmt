export interface IQB {
    position: PositionTypes;
    stats: IQBStats;
}

export enum PositionTypes {
    QB = 'QB',
    RB = 'RB',
    WR = 'WR',
    TE = 'TE',
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
    rushingYdsPerAttempt: {
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