import { createReducer, on } from "@ngrx/store";
import { FANTASY_FOOTBALL_INITIAL_STATE, QB_COL_DEFS, RB_COL_DEF } from "../../const/fantasy-football.const";
import { FantasyFootballState } from "../../models/fantasy-football.interface";
import { loadQbsSuccess, loadRbs, loadRbsSuccess, setRowData, updateSelectedPlayers, updateYearFilter } from "../actions/fantasy-football.actions";

const initialState: FantasyFootballState = {
    ...FANTASY_FOOTBALL_INITIAL_STATE
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
        (state, {qbs}) => ({...state, qbs, rowData: qbs, selectedRowData: qbs, gridConfig: {colDef: QB_COL_DEFS}})
    ),
    on(
        loadRbsSuccess,
        (state, {rbs}) => ({...state, rbs, selectedRowData: rbs, rowData: rbs, gridConfig: {colDef: RB_COL_DEF}})
    ),
    on(
        setRowData,
        (state, {rowData}) => ({...state, rowData})
    )
);