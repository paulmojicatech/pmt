import { createAction, props } from '@ngrx/store';
import { RegisterProfileHttpRequest } from '../models/register.interface';

export enum ProfileActionType {
  ROUTE_TO_PROFILE_MODULE = '[Profile]Route To Profile Module',
  ROUTE_TO_LOGIN = '[Profile]Route To Login',
  REGISTER_PROFILE = '[Profile]Register Profile',
  REGISTER_PROFILE_SUCCESS = '[Profile]Register Profile Success',
  REGISTER_PROFILE_FAIL = '[Profile]Register Profile Fail',
}

export const routeToProfileModule = createAction(
  ProfileActionType.ROUTE_TO_PROFILE_MODULE
);

export const routeToLogin = createAction(ProfileActionType.ROUTE_TO_LOGIN);

export const registerProfile = createAction(
  ProfileActionType.REGISTER_PROFILE,
  props<{ req: RegisterProfileHttpRequest; url: string }>()
);

export const registerProfileSuccess = createAction(
  ProfileActionType.REGISTER_PROFILE_SUCCESS
);

export const registerProfileFail = createAction(
  ProfileActionType.REGISTER_PROFILE_FAIL,
  props<{ errorMsg: string }>()
);
