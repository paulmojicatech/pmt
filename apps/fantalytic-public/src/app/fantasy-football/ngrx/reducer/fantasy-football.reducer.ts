import { createReducer, on } from "@ngrx/store";
import { PositionTypes } from "@pmt/fantalytic-shared";
import { FANTASY_FOOTBALL_INITIAL_STATE, FANTASY_FOOTBALL_RB_STATE, FANTASY_FOOTBALL_REC_STATE, FANTASY_FOOTBAL_DEF_RUSH_STATE } from "../../const/fantasy-football.const";
import { getDefRushRowData, getQbRowData, getRbRowData, getWrTeRowData } from "../../functions/fantasy-football.functions";
import { FantasyFootballState } from "../../models/fantasy-football.interface";
import { setPositionType, updateYearFilter } from "../actions/fantasy-football.actions";

const initialState: FantasyFootballState = {
    ...FANTASY_FOOTBALL_INITIAL_STATE,
    rowData: getQbRowData(),
    selectedRowData: getQbRowData()
};

export const fantasyFootballReducer = createReducer(
    initialState,
    on(
        setPositionType,
        (state, {position}) => {
            let updatedState = FANTASY_FOOTBALL_INITIAL_STATE;
            switch (position) {
                case PositionTypes.RB: {
                    const rowData = getRbRowData();
                    updatedState = {...FANTASY_FOOTBALL_RB_STATE, rowData, selectedRowData: rowData};
                    break;
                }
                case PositionTypes.WR:
                case PositionTypes.TE: {
                    const rowData = getWrTeRowData();
                    updatedState = {...FANTASY_FOOTBALL_REC_STATE, rowData, selectedRowData: rowData};
                    break;
                }
                case PositionTypes.DEF_RUSH: {
                    const rowData = getDefRushRowData();
                    updatedState = {...FANTASY_FOOTBAL_DEF_RUSH_STATE, rowData, selectedRowData: rowData };
                    break;
                }
                default: {
                    const rowData = getQbRowData();
                    updatedState = {...FANTASY_FOOTBALL_INITIAL_STATE, rowData, selectedRowData: rowData};
                    break;
                }
            }
            return updatedState;
        }
    ),
    on(
        updateYearFilter,
        (state, {year}) => {
            const updatedRows = state.rowData?.filter(row => {
                return `${row['year']}`.includes(`${year}`);
            });
            return {...state, selectedRowData: updatedRows};
        }
    )
);