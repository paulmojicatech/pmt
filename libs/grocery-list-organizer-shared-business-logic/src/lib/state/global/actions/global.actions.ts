import { createAction, props } from '@ngrx/store';

export enum GlobalActionType {
  INITIALIZE_APP = '[Global]Initialize App',
  SET_IS_ACCOUNT_LINKED = '[Global]Set Is Account Linked',
}

export const initializeApp = createAction(GlobalActionType.INITIALIZE_APP);

export const setIsAccountLinked = createAction(
  GlobalActionType.SET_IS_ACCOUNT_LINKED,
  props<{ isAccountLinked: boolean }>()
);
