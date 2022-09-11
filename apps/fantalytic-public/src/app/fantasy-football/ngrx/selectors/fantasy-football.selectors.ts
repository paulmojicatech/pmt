import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FantasyFootballState } from "../../models/fantasy-football.interface";

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