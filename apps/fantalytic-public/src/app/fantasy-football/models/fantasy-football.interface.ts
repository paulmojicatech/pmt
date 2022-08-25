import { PositionTypes } from "@pmt/fantalytic-shared";
import { ColDef } from "ag-grid-community";

export interface GridConfig {
    colDef: ColDef[];
}

export interface FantasyFootballState {
    gridConfig: GridConfig;
    position: PositionTypes;
    rowData?: {[key: string]: number | string}[];
}