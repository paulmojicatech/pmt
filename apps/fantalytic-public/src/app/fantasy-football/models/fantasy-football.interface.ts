import { PositionTypes } from "@pmt/fantalytic-shared";
import { ColDef } from "ag-grid-community";

export interface GridConfig {
    colDef: ColDef[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gridOptions: {[key: string]: any};
}

export interface FantasyFootballState {
    gridConfig: GridConfig;
    position: PositionTypes;
    rowData: {[key: string]: number | string}[];
}