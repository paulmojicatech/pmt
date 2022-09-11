import { PositionTypes, QB, RB } from "@pmt/fantalytic-shared";
import { ColDef } from "ag-grid-community";
import { FantasyFootballRowData } from "../types/fantasy-football.types";

export interface GridConfig {
    colDef: ColDef[];
}

export interface FantasyFootballState {
    gridConfig: GridConfig;
    position: PositionTypes;
    rowData?: FantasyFootballRowData[];
    selectedRowData?: FantasyFootballRowData[];
    selectedPlayers?: string[];
    qbs?: QB[];
    rbs?: RB[];
}
