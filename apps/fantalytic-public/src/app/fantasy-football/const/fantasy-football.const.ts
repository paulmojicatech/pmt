import {ColDef, GridOptions} from 'ag-grid-community';
import { getBaseGridOptions } from '../../functions/grid.functions';
import {PositionTypes} from '@pmt/fantalytic-shared';
import { getDefRushRowData, getQbRowData, getRbRowData, getWrTeRowData } from '../functions/fantasy-football.functions';
import { FantasyFootballState } from '../models/fantasy-football.interface';

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
        field: 'passingYds',
        headerName: 'Passing Yards'
    },
    {
        field: 'tds',
        headerName: 'Touchdowns'
    },
    {
        field: 'passingYdsPerAttempt',
        headerName: 'Passing Yards Per Attempt'
    },
    {
        field: 'ints',
        headerName: 'Interceptions'
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
        field: 'rushingYds',
        headerName: 'Rushing Yards'
    },
    {
        field: 'rushingYdsPerAttempt',
        headerName: 'Rushing Yards Per Attepmt'
    },
    {
        field: 'rushingTds',
        headerName: 'Rushing Touchdowns'
    },
    {
        field: 'rushing20Yds',
        headerName: '20+ Yard Runs'
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
        field: 'receptions',
        headerName: 'Receptions'
    },
    {
        field: 'receivingYds',
        headerName: 'Receiving Yards'
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
        field: 'receivingTargets',
        headerName: 'Targets'
    }
];

export const DEF_RUSH_COL_DEF: ColDef[] = [
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
        field: 'rushYds',
        headerName: 'Allowed Rushing Yards'
    },
    {
        field: 'ypc',
        headerName: 'Allowed Yards Per Carry'
    },
    {
        field: 'td',
        headerName: 'Allowed Rushing Touchdowns'
    }
];

export const FANTASY_FOOTBALL_INITIAL_STATE: FantasyFootballState = {
    gridConfig: {
        colDef: QB_COL_DEFS,
        gridOptions: {
            ...getBaseGridOptions(), 
            filter: true
        } as GridOptions
    },
    position: PositionTypes.QB,
    rowData: getQbRowData()
};

export const FANTASY_FOOTBALL_RB_STATE: FantasyFootballState = {
    gridConfig: {
        colDef: RB_COL_DEF,
        gridOptions: {...getBaseGridOptions(), filter: true}
    },
    position: PositionTypes.RB,
    rowData: getRbRowData()
};

export const FANTASY_FOOTBALL_REC_STATE: FantasyFootballState = {
    gridConfig: {
        colDef: WR_TE_COL_DEF,
        gridOptions: {...getBaseGridOptions(), filter: true}
    },
    position: PositionTypes.WR,
    rowData: getWrTeRowData()
};

export const FANTASY_FOOTBAL_DEF_RUSH_STATE: FantasyFootballState = {
    gridConfig: {
        colDef: DEF_RUSH_COL_DEF,
        gridOptions: {...getBaseGridOptions(), filter: true}
    },
    position: PositionTypes.DEF_RUSH,
    rowData: getDefRushRowData()
};

