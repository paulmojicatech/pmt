import { createReducer, on } from '@ngrx/store';
import { setIsAccountLinked } from '../actions/global.actions';

export interface GlobalState {
  isAccountLinked: boolean;
}

const initialState: GlobalState = {
  isAccountLinked: false,
};

export const globalReducer = createReducer(
  initialState,
  on(setIsAccountLinked, (state, { isAccountLinked }) => ({
    ...state,
    isAccountLinked,
  }))
);
