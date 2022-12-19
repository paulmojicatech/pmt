import { createReducer, on } from '@ngrx/store';
import { setHasBackButton } from '../actions/shared.actions';

export interface SharedState {
    hasBackButton: boolean;
}

export const initialState: SharedState = {
    hasBackButton: false
};

export const sharedReducer = createReducer(
    initialState,
    on(
        setHasBackButton,
        (state, {hasBackButton}) => ({...state, hasBackButton})
    )
);
