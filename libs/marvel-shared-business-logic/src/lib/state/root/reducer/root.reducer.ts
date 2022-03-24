import { createReducer, on } from '@ngrx/store';
import { AppState } from '../models/app-state.interface';
import {
  setErrorMsg,
  setFooterText,
  setLoading,
} from '../actions/root.actions';

const initialState: AppState = {
  isLoading: false,
  errorMsg: undefined,
  footerText: undefined,
};

export const rootReducer = createReducer(
  initialState,
  on(setLoading, (state, { isLoading }) => ({ ...state, isLoading })),
  on(setErrorMsg, (state, { errorMsg }) => ({ ...state, errorMsg })),
  on(setFooterText, (state, { footerText }) => ({ ...state, footerText }))
);
