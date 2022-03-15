import { createAction, props } from '@ngrx/store';

export enum GlobalActionType {
  INITIALIZE_APP = '[Global]Initialize App',
  SET_IS_ACCOUNT_LINKED = '[Global]Set Is Account Linked',
  PRELOAD_DEVICE = '[Global]Preload Device With Available Items',
}

export const initializeApp = createAction(GlobalActionType.INITIALIZE_APP);

export const setIsAccountLinked = createAction(
  GlobalActionType.SET_IS_ACCOUNT_LINKED,
  props<{ isAccountLinked: boolean }>()
);

export const preloadDevice = createAction(GlobalActionType.PRELOAD_DEVICE);
