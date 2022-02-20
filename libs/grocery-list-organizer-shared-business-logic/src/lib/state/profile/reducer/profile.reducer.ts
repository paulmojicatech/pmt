import { createReducer, on } from '@ngrx/store';
import { routeToProfileModule } from '../actions/profile.actions';

export interface ProfileState {
  isLoaded: boolean;
}

const initialState: ProfileState = {
  isLoaded: false,
};

export const profileReducer = createReducer(
  initialState,
  on(routeToProfileModule, (state) => ({ ...state, isLoaded: true }))
);
