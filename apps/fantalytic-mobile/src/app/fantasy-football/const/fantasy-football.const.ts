import { PositionTypes } from '../../../../../../libs/fantalytic-shared/src/index';

export const FANTASY_FOOTBALL_STAT_HEADER_MAP = {
    [PositionTypes.QB]: {
        passingYds: 'Yds',
        ints: 'Ints',
        passingYdsPerAttempt: 'Yds Per Att',
        tds: 'TDs'
    },
    [PositionTypes.RB]: {
        rushingYds: 'Yds',
        rushAttempts: 'Attempts',
        rushingTds: 'TDs',
        rushing20Yds: '20+ Yd'
    },
    [PositionTypes.WR]: {
        receptions: 'Rec',
        receivingYds: ' Yds',
        receivingTds: 'TDs',
        receiving20Plus: '20+ Yd',
        receiving40Plus: '40+ Yd',
        receivingTargets: 'Targets'
    },
    [PositionTypes.DEF]: {
        rushYdsAllowed: 'Rush Yds',
        ydsPerCarry: 'Yds / Carry',
        rushTdsAllowed: 'Rush TDs',
        completionPctAllowed: 'Comp %',
        passYdsAllowed: 'Pass Yds',
        ints: 'Ints',
        sacks: 'Sacks'
    }
};
