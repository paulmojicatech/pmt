import { Defense, PositionTypes, QB, RB, Receivers } from "@pmt/fantalytic-shared";
import { ColDef } from "ag-grid-community";
import { FantasyFootballRowData } from "../fantasy-football/types/fantasy-football.types";

export interface GridConfig {
    colDef: ColDef[];
}

export interface FantasyFootballState {
    gridConfig: GridConfig;
    position: PositionTypes;
    year?: number;
    rowData?: FantasyFootballRowData[];
    selectedRowData?: FantasyFootballRowData[];
    selectedPlayers?: string[];
    qbs?: QB[];
    rbs?: RB[];
    receivers?: Receivers[];
    defenses?: Defense[];
}
