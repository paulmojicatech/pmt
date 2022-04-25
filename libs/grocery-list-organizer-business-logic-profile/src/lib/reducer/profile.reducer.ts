import { createReducer, on } from '@ngrx/store';
import {
  routeToProfileModule,
  setLoggedInProfile,
} from '../actions/profile.actions';
import { Profile } from '../models/register.interface';

export interface ProfileState {
  isLoaded: boolean;
  profile?: Profile;
}

const initialState: ProfileState = {
  isLoaded: false,
  profile: undefined,
};

export const profileReducer = createReducer(
  initialState,
  on(routeToProfileModule, (state) => ({ ...state, isLoaded: true })),
  on(setLoggedInProfile, (state, { profile }) => ({ ...state, profile }))
);
