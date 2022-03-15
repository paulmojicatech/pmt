import { createFeatureSelector } from '@ngrx/store';
import { ProfileState } from './reducer/profile.reducer';

export const profileState = createFeatureSelector<ProfileState>('profile');
