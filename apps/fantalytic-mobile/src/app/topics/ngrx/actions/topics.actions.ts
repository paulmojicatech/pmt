import { createAction } from '@ngrx/store';
import { RssFeedType, Topic } from '../../../../../../../libs/fantalytic-shared/src/index';

export const loadTopics = createAction(
    '[Topics] Load Topics',
    (rssFeed: RssFeedType) => ({rssFeed})
);

export const loadTopicsFail = createAction(
    '[Topics] Load Topics Failed',
    (err: string) => ({err})
);

export const loadTopicsSuccess = createAction(
    '[Topics] Load Topics Success',
    (topics: Topic[]) => ({topics})
);
