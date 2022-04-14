import { createAction, props } from '@ngrx/store';

export enum GlobalActionType {
  INITIALIZE_APP = '[Global]Initialize App',
  SET_IS_ACCOUNT_LINKED = '[Global]Set Is Account Linked',
  PRELOAD_DEVICE = '[Global]Preload Device With Available Items',
  TOGGLE_SPINNER = '[Global]Toggle Spinner',
  SHOW_TOAST_MESSAGE = '[Global]Show Toast Message',
}

export const initializeApp = createAction(GlobalActionType.INITIALIZE_APP);

export const setIsAccountLinked = createAction(
  GlobalActionType.SET_IS_ACCOUNT_LINKED,
  props<{ isAccountLinked: boolean }>()
);

export const preloadDevice = createAction(GlobalActionType.PRELOAD_DEVICE);

export const toggleSpinner = createAction(
  GlobalActionType.TOGGLE_SPINNER,
  props<{ isShowSpinner: boolean }>()
);

export const showToastMessage = createAction(
  GlobalActionType.SHOW_TOAST_MESSAGE,
  props<{ isError: boolean; message: string }>()
);
