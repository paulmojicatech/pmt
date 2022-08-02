import * as stats from './index';

export enum PositionTypes {
    QB = 'QB',
    RB = 'RB',
    WR = 'WR',
    TE = 'TE',
    UNKNOWN = 'UNKNOWN'
}

export enum GetLocationType {
    HTTP = 'HTTP',
    MONGO = 'MONGO',
    FILE = 'FILE'
}

export interface IFantalyticGetCommand {
    type: RootCommandTypes,
    pos: PositionTypes,
    year: string,
    location?: GetLocationType,
    stat?: stats.PostionStat
}

export enum CommandTypes {
    ROOT = 'root'
}

export enum RootCommandTypes {
    GET = 'get',
    CHECK = 'check',
    UPLOAD = 'upload',
    UNKNOWN = 'unknown'
}

export interface IStatPosition {
    statName: string;
    statColIndex: number;
}

