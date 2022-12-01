import { importProvidersFrom } from '@angular/core';
import { Route } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FantasyFootballEffects } from '../ngrx/effects/fantasy-football.effects';
import { fantasyFootballReducer } from '../ngrx/reducer/fantasy-football.reducer';


export const fantasyFootballRoutes: Route[] = [
    {
        path: 'fantasy-football',
        loadComponent: () => import('../fantasy-football.component').then(c => c.FantasyFootballComponent),
        providers: [
            importProvidersFrom(
              StoreModule.forFeature('fantasy-football', fantasyFootballReducer),
              EffectsModule.forFeature([FantasyFootballEffects])
            )
          ]
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'fantasy-football'
    }
];
