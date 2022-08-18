import {ColDef} from 'ag-grid-community';
import { getBaseGridOptions } from '../../functions/grid.functions';
import {PositionTypes} from '@pmt/fantalytic-shared';
import { getQbRowData } from '../functions/fantasy-football.functions';
import { FantasyFootballState } from '../models/fantasy-football.interface';

export const QB_COL_DEFS: ColDef[] = [
    {
        field: 'player',
        headerName: 'Player'
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
        headerName: 'Player'
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

export const FANTASY_FOOTBALL_INITIAL_STATE: FantasyFootballState = {
    gridConfig: {
        colDef: QB_COL_DEFS,
        gridOptions: {...getBaseGridOptions(), filter: true}
    },
    position: PositionTypes.QB,
    rowData: getQbRowData()
};

