import { createReducer, on } from '@ngrx/store';
import { TopicsState } from '../../../../../../../libs/fantalytic-shared/src/index';
import { loadTopicsSuccess } from '../actions/topics.actions';

const initialState: TopicsState = {
    topics: undefined
};

export const topicsReducer = createReducer(
    initialState,
    on(
        loadTopicsSuccess,
        (state, {topics}) => ({...state, topics})
    )
);
