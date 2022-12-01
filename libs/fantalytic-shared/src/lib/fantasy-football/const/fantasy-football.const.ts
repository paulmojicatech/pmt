import { PositionTypes } from '@pmt/fantalytic-shared';
import { ColDef } from 'ag-grid-community';
import { FantasyFootballState } from '../../models/fantasy-football.interface';

export const QB_COL_DEFS: ColDef[] = [
    {
        field: 'player',
        headerName: 'Player',
        pinned: 'left',
        checkboxSelection: true
    },
    {
        field: 'year',
        headerName: 'Year'
    },
    {
        field: 'passingYdsPerAttempt',
        headerName: 'Passing Yards Per Attempt'
    },
    {
        field: 'tds',
        headerName: 'Touchdowns'
    },
    {
        field: 'ints',
        headerName: 'Interceptions'
    },
    {
        field: 'passingYds',
        headerName: 'Passing Yards'
    }
];

export const RB_COL_DEF: ColDef[] = [
    {
        field: 'player',
        headerName: 'Player',
        pinned: 'left',
        checkboxSelection: true
    },
    {
        field: 'year',
        headerName: 'Year'
    },
    {
        field: 'rushing20Yds',
        headerName: '20+ Yard Runs'
    },
    {
        field: 'rushAttempts',
        headerName: 'Rushing Yards Per Attepmt'
    },
    {
        field: 'rushingTds',
        headerName: 'Rushing Touchdowns'
    },
    {
        field: 'rushingYds',
        headerName: 'Rushing Yards'
    }
];

export const WR_TE_COL_DEF: ColDef[] = [
    {
        field: 'player',
        headerName: 'Player',
        pinned: 'left',
        checkboxSelection: true
    },
    {
        field: 'year',
        headerName: 'Year'
    },
    {
        field: 'receivingTds',
        headerName: 'Receiving Touchdowns'
    },
    {
        field: 'receiving20Plus',
        headerName: 'Receiving 20+ Yards'
    },
    {
        field: 'receiving40Plus',
        headerName: 'Receiving 40+ Yards'
    },
    {
        field: 'receptions',
        headerName: 'Receptions'
    },
    {
        field: 'receivingTargets',
        headerName: 'Targets'
    },
    {
        field: 'receivingYds',
        headerName: 'Receiving Yards'
    }
];

export const DEF_COL_DEF: ColDef[] = [
    {
        field: 'team',
        headerName: 'Team',
        pinned: 'left',
        checkboxSelection: true
    },
    {
        field: 'year',
        headerName: 'Year'
    },
    {
        field: 'rushYdsAllowed',
        headerName: 'Allowed Rushing Yards'
    },
    {
        field: 'ydsPerCarry',
        headerName: 'Allowed Yards Per Carry'
    },
    {
        field: 'rushTdsAllowed',
        headerName: 'Allowed Rushing Touchdowns'
    },
    {
        field: 'completionPctAllowed',
        headerName: 'Completion Percentage Allowed'
    },
    {
        field: 'ints',
        headerName: 'Interceptions'
    },
    {
        field: 'sacks',
        headerName: 'Sacks'
    }
];

export const FANTASY_FOOTBALL_INITIAL_STATE: FantasyFootballState = {
    gridConfig: {
        colDef: QB_COL_DEFS
    },
    position: PositionTypes.QB,
    year: 2022
};

export const FANTASY_FOOTBALL_RB_STATE: FantasyFootballState = {
    gridConfig: {
        colDef: RB_COL_DEF
    },
    position: PositionTypes.RB,
};

export const FANTASY_FOOTBALL_REC_STATE: FantasyFootballState = {
    gridConfig: {
        colDef: WR_TE_COL_DEF
    },
    position: PositionTypes.WR
};

export const FANTASY_FOOTBAL_DEF_STATE: FantasyFootballState = {
    gridConfig: {
        colDef: DEF_COL_DEF
    },
    position: PositionTypes.DEF_RUSH
};

