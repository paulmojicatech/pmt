import { createAction } from '@ngrx/store';

import { Defense, PositionTypes, QB, RB, Receivers, FantasyFootballRowData } from '../../../../../../../libs/fantalytic-shared/src';


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

export const loadDefenses = createAction(
    '[Fantasy Football] Load Defenses'
);

export const loadDefensesSuccess = createAction(
    '[Fantasy Football] Load Defenses Success',
    (defenses: Defense[]) => ({defenses})
);

export const fantasyFootballError = createAction(
    '[Fantasy Football] Fantasy Football Error',
    (err: string) => ({err})
);

export const setRowData = createAction(
    '[Fantasy Football] Set Row Data',
    (rowData: FantasyFootballRowData[]) => ({rowData})
);

