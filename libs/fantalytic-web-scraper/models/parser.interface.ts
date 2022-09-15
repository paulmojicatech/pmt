import { PositionTypes } from '../../fantalytic-shared/src/lib/models/fantalytic.interface';
import * as stats from './index';


export enum GetLocationType {
    HTTP = 'HTTP',
    MONGO = 'MONGO',
    FILE = 'FILE'
}

export interface IFantalyticGetCommand {
    type: RootCommandTypes,
    pos: PositionTypes,
    year: string,
    week?: number,
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

