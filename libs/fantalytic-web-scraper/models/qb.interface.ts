import { IStatPosition, PositionTypes } from './parser.interface';

export interface IQB {
    position: PositionTypes;
    stats: IQBStats;
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