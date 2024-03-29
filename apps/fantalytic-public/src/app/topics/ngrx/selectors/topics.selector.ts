import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TopicsState } from "@pmt/fantalytic-shared";

export const getTopicsState = createFeatureSelector<TopicsState>('topics');

export const getTopics = createSelector(
    getTopicsState,
    state => state.topics
);