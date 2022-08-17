import { createAction } from "@ngrx/store";
import { GridConfig } from "../../models/fantasy-football.interface";
import {PositionTypes} from '@pmt/fantalytic-shared';

export const setGridConfig = createAction(
    '[Fantasy Football] Set Grid Config',
    (gridConfig: GridConfig) => ({gridConfig})
);

export const setPositionType = createAction(
    '[Fantasy Football] Set Position Type',
    (position: PositionTypes) => ({position})
);
