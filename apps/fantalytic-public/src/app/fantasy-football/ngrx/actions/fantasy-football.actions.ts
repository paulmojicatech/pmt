import { createAction } from "@ngrx/store";
import { PositionTypes } from '@pmt/fantalytic-shared';


export const setPositionType = createAction(
    '[Fantasy Football] Set Position Type',
    (position: PositionTypes) => ({position})
);
