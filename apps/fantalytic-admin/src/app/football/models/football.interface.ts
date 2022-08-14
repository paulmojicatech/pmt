import { PositionTypes } from "@pmt/fantalytic-shared";
import { ColDef } from "ag-grid-community";

export interface FootballState {
    selectedPosition: PositionTypes | undefined;
    colDefs: ColDef[] | undefined;
    rowData: {[key: string]: string | number}[] | undefined;
}