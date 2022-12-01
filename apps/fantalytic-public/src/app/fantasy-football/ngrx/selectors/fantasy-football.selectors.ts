import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FantasyFootballState } from "@pmt/fantalytic-shared";

export const getFantasyFootballState = createFeatureSelector<FantasyFootballState>('fantasy-football');

export const getPosition = createSelector(
    getFantasyFootballState,
    state => state.position
);

export const getSelectedRowData = createSelector(
    getFantasyFootballState,
    state => state.selectedRowData
);

export const getSelectedPlayers = createSelector(
    getFantasyFootballState,
    state => state.selectedPlayers
);

export const getQbs = createSelector(
    getFantasyFootballState,
    state => state.qbs
);

export const getRbs = createSelector(
    getFantasyFootballState,
    state => state.rbs
);

export const getReceivers = createSelector(
    getFantasyFootballState,
    state => state.receivers
);

export const getDefenses = createSelector(
    getFantasyFootballState,
    state => state.defenses
);

export const getSelectedYear = createSelector(
    getFantasyFootballState,
    state => state.year
);