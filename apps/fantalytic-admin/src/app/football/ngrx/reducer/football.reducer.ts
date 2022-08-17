import { createReducer, on } from "@ngrx/store";
import { FootballState } from "../../models/football.interface";
import { setImportColDef, setPositionToImport } from "../actions/football.actions";

const initialState: FootballState = {
    selectedPosition: undefined,
    colDefs: undefined,
    rowData: undefined
}

export const footballReducer = createReducer(
    initialState,
    on(
        setPositionToImport,
        (state, {positionType}) => {
            return {...state, selectedPosition: positionType};
        }
    ),
    on(
        setImportColDef,
        (state, {colDef}) => ({...state, colDefs: colDef})
    )
);