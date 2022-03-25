import { createAction, props } from '@ngrx/store';
import { Recomendation } from '../../../models/home.interface';

export enum HomeActionType {
  ROUTE_TO_HOME = '[Home] Route To Home',
  LOAD_RECOMMENDATIONS = '[Home] Load Recommendations',
  LOAD_RECOMMENDATIONS_SUCCESS = '[Home] Load Recomendations Success',
  LOAD_RECOMMENDATIONS_FAIL = '[Home] Load Recommendations Fail',
}

export const routeToHome = createAction(HomeActionType.ROUTE_TO_HOME);

export const loadRecommendations = createAction(
  HomeActionType.LOAD_RECOMMENDATIONS
);

export const loadRecommendationsSuccess = createAction(
  HomeActionType.LOAD_RECOMMENDATIONS_SUCCESS,
  props<{ recomendations: Recomendation }>()
);
