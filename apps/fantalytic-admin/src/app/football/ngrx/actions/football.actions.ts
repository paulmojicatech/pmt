import { createAction } from "@ngrx/store";
import { PositionTypes } from "@pmt/fantalytic-shared";

export const setPositionToImport = createAction(
    '[Football] Set Position To Import',
    (positionType: PositionTypes) => ({positionType})
);


