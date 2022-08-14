import { ColDef } from "ag-grid-community";

export const QB_COL_DEF: ColDef[] = [
    {
        field: 'name',
        headerName: 'Name'
    },
    {
        field: 'passingYds',
        headerName: 'Passing Yards'
    },
    {
        field: 'ints',
        headerName: 'Interceptions'
    },
    {
        field: 'tds',
        headerName: 'Touchdowns'
    },
    {
        field: 'passingYdsPerAttempt',
        headerName: 'Passing Yards Per Attempt'
    }
];
