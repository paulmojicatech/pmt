import { IStatPosition, PositionTypes } from "./parser.interface";

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