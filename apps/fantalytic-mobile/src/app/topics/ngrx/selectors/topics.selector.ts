import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TopicsState } from '../../../../../../../libs/fantalytic-shared/src/index';

export const getTopicsState = createFeatureSelector<TopicsState>('topics');

export const getTopics = createSelector(
    getTopicsState,
    state => state.topics
);
