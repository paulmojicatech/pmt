import { createAction } from '@ngrx/store';

export const setHasBackButton = createAction(
    '[Shared] Set Has Back Button',
    (hasBackButton: boolean) => ({hasBackButton})
);
