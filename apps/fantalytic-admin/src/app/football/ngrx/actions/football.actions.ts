import { createAction } from "@ngrx/store";
import { PositionTypes } from "@pmt/fantalytic-shared";
import { ColDef } from "ag-grid-community";

export const setPositionToImport = createAction(
    '[Football] Set Position To Import',
    (positionType: PositionTypes) => ({positionType})
);

export const setImportColDef = createAction(
    '[Football] Set Import Column Definition',
    (colDef: ColDef[]) => ({colDef})
);


