import { createAction } from "@ngrx/store";
import { PositionTypes, QB, RB, Receivers } from '@pmt/fantalytic-shared';
import { FantasyFootballRowData } from "../../types/fantasy-football.types";


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

export const loadRbs = createAction(
    '[Fantasy Football] Load Rbs'
);

export const loadRbsSuccess = createAction(
    '[Fantasy Football] Load Rbs Success',
    (rbs: RB[]) => ({rbs})
);

export const loadReceivers = createAction(
    '[Fantasy Football] Load Receivers'
);

export const loadReceiversSuccess = createAction(
    '[Fantasy Football] Load Receivers Success',
    (receivers: Receivers[]) => ({receivers})
);

export const fantasyFootballError = createAction(
    '[Fantasy Football] Fantasy Football Error',
    (err: string) => ({err})
);

export const setRowData = createAction(
    '[Fantasy Football] Set Row Data',
    (rowData: FantasyFootballRowData[]) => ({rowData})
);

