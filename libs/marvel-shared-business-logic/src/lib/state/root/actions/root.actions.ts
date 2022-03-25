import { createAction, props } from '@ngrx/store';

export enum AppActionType {
  INIT_APP = '[Root] Initialize App',
  SET_LOADING = '[Root] Set Loading',
  SET_ERROR_MSG = '[Root] Set Error Message',
  SET_FOOTER_TEXT = '[Root] Set Footer Text',
}

export const initApp = createAction(AppActionType.INIT_APP);

export const setLoading = createAction(
  AppActionType.SET_LOADING,
  props<{ isLoading: boolean }>()
);

export const setErrorMsg = createAction(
  AppActionType.SET_ERROR_MSG,
  props<{ errorMsg: string }>()
);

export const setFooterText = createAction(
  AppActionType.SET_FOOTER_TEXT,
  props<{ footerText: string }>()
);
