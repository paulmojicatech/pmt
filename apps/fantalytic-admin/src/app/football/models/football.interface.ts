import { PositionTypes } from "@pmt/fantalytic-shared";
import { ColDef } from "ag-grid-community";

export interface FootballState {
    selectedPosition: PositionTypes;
    colDefs: ColDef[];
    rowData: {[key: string]: string | number}[];
}