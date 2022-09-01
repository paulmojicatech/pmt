import { createAction } from "@ngrx/store";
import { PositionTypes } from '@pmt/fantalytic-shared';


export const setPositionType = createAction(
    '[Fantasy Football] Set Position Type',
    (position: PositionTypes) => ({position})
);

export const updateYearFilter = createAction(
    '[Fantasy Football] Update Filter Year',
    (year: number) => ({year})
);

export const updateSelectedPlayers = createAction(
    '[Fantasy Football] Update Selected Players',
    (selectedPlayers: string[]) => ({selectedPlayers})
);
