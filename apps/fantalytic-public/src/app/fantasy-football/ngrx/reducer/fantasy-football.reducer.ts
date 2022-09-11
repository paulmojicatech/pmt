import { createReducer, on } from "@ngrx/store";
import { FANTASY_FOOTBALL_INITIAL_STATE } from "../../const/fantasy-football.const";
import { FantasyFootballState } from "../../models/fantasy-football.interface";
import { loadQbsSuccess, setRowData, updateSelectedPlayers, updateYearFilter } from "../actions/fantasy-football.actions";

const initialState: FantasyFootballState = {
    ...FANTASY_FOOTBALL_INITIAL_STATE,
    rowData: undefined,
    selectedRowData: undefined,
    selectedPlayers: [],
    qbs: undefined
};

export const fantasyFootballReducer = createReducer(
    initialState,
   on(
        updateYearFilter,
        (state, {year}) => {
            const updatedRows = state.rowData?.filter(row => {
                return `${row['year']}`.includes(`${year}`);
            });
            return {...state, selectedRowData: updatedRows};
        }
    ),
    on(
        updateSelectedPlayers,
        (state, {selectedPlayers}) => {
            return {...state, selectedPlayers};
        }
    ),
    on(
        loadQbsSuccess,
        (state, {qbs}) => ({...state, qbs, selectedRowData: qbs})
    ),
    on(
        setRowData,
        (state, {rowData}) => ({...state, rowData})
    )
);