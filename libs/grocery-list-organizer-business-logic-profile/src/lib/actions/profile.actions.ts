import { createAction } from '@ngrx/store';

export enum ProfileActionType {
  ROUTE_TO_PROFILE_MODULE = '[Profile]Route To Profile Module',
  ROUTE_TO_LOGIN = '[Profile]Route To Login',
}

export const routeToProfileModule = createAction(
  ProfileActionType.ROUTE_TO_PROFILE_MODULE
);

export const routeToLogin = createAction(ProfileActionType.ROUTE_TO_LOGIN);
