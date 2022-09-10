import { createAction } from "@ngrx/store";
import { PositionTypes, QB } from '@pmt/fantalytic-shared';


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

export const loadQbs = createAction(
    '[Fantasy Football] Load Qbs'
);

export const loadQbsSuccess = createAction(
    '[Fantasy Football] Load Qbs Success',
    (qbs: QB[]) => ({qbs})
);

export const fantasyFootballError = createAction(
    '[Fantasy Football] Fantasy Football Error',
    (err: string) => ({err})
);
