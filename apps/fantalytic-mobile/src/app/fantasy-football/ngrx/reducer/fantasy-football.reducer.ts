/* eslint-disable @typescript-eslint/dot-notation */
import { createReducer, on } from '@ngrx/store';
import {
  DEF_COL_DEF,
  FANTASY_FOOTBALL_INITIAL_STATE,
  QB_COL_DEFS,
  RB_COL_DEF,
  WR_TE_COL_DEF,
  PositionTypes,
  FantasyFootballState,
  FantasyFootballRowData,
} from '../../../../../../../libs/fantalytic-shared/src';
import {
  loadDefensesSuccess,
  loadQbsSuccess,
  loadRbsSuccess,
  loadReceiversSuccess,
  setPositionType,
  setRowData,
  updateSelectedPlayers,
  updateYearFilter,
} from '../actions/fantasy-football.actions';

const initialState: FantasyFootballState = {
  ...FANTASY_FOOTBALL_INITIAL_STATE,
};

export const fantasyFootballReducer = createReducer(
  initialState,
  on(updateYearFilter, (state, { year }) => {
    let updatedRows: FantasyFootballRowData[] = [];
    switch (state.position) {
      case PositionTypes.QB: {
        updatedRows = state.qbs?.filter((row) => `${row['year']}`.includes(`${year}`)) as FantasyFootballRowData[];
        break;
      }
      case PositionTypes.RB: {
        updatedRows = state.rbs?.filter(
          (row) => row.year === year
        ) as FantasyFootballRowData[];
        break;
      }
      case PositionTypes.WR: {
        updatedRows = state.receivers?.filter(
          (row) => row.year === year
        ) as FantasyFootballRowData[];
        break;
      }
      case PositionTypes.DEF: {
        updatedRows = state.defenses?.filter(
          (row) => row.year === year
        ) as FantasyFootballRowData[];
        break;
      }
      default:
        break;
    }
    return { ...state, selectedRowData: updatedRows, year };
  }),
  on(setPositionType, (state, { position }) => ({ ...state, position })),
  on(updateSelectedPlayers, (state, { selectedPlayers }) => ({ ...state, selectedPlayers })),
  on(loadQbsSuccess, (state, { qbs }) => {
    const filteredQbs = qbs.filter((qb) => qb.year === state.year);
    return {
      ...state,
      qbs,
      rowData: filteredQbs,
      selectedRowData: filteredQbs,
      gridConfig: { colDef: QB_COL_DEFS },
    };
  }),
  on(loadRbsSuccess, (state, { rbs }) => {
    const filteredRbs = rbs.filter((rb) => rb.year === state.year);
    return {
      ...state,
      rbs,
      selectedRowData: filteredRbs,
      rowData: filteredRbs,
      gridConfig: { colDef: RB_COL_DEF },
    };
  }),
  on(loadReceiversSuccess, (state, { receivers }) => {
    const filteredRecs = receivers.filter((rec) => rec.year === state.year);
    return {
      ...state,
      receivers,
      rowData: filteredRecs,
      selectedRowData: filteredRecs,
      gridConfig: { colDef: WR_TE_COL_DEF },
    };
  }),
  on(loadDefensesSuccess, (state, { defenses }) => {
    const filteredDefs = defenses.filter((def) => def.year === state.year);
    return {
      ...state,
      defenses,
      rowData: filteredDefs,
      selectedRowData: filteredDefs,
      gridConfig: { colDef: DEF_COL_DEF },
    };
  }),
  on(setRowData, (state, { rowData }) => ({ ...state, rowData }))
);
