import {} from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FantasyFootballEffects } from './fantasy-football/ngrx/effects/fantasy-football.effects';
import { fantasyFootballReducer } from './fantasy-football/ngrx/reducer/fantasy-football.reducer';
import { MobileCheckerService } from './fantasy-football/services/mobile-checker.service';
import { TopicEffects } from './topics/ngrx/effects/topics.effects';
import { topicsReducer } from './topics/ngrx/reducer/topics.reducer';

const routes: Route[] = [
  {
    path: 'topics',
    loadComponent: () =>
      import('../app/topics/topics.component').then((a) => a.TopicsComponent),
    providers: [
      importProvidersFrom(
        StoreModule.forFeature('topics', topicsReducer),
        EffectsModule.forFeature([TopicEffects])
      )
    ],
  },
  {
    path: 'fantasy-football',
    loadComponent: () => import('../app/fantasy-football/fantasy-football.component').then((a) => a.FantasyFootballComponent),
    canActivate: [MobileCheckerService],
    providers: [
      importProvidersFrom(
        StoreModule.forFeature('fantasy-football', fantasyFootballReducer),
        EffectsModule.forFeature([FantasyFootballEffects]),
      )      
    ],
    children: [
    {
        path: 'stats',
        loadComponent: () => import('../app/fantasy-football/components/stats/stats.component').then(c => c.StatsComponent)
      },
      {
        path: 'compare',
        loadComponent: () => import('../app/fantasy-football/components/compare-players/compare-players.component').then(c => c.ComparePlayersComponent)
      },
      {
        path: 'scores',
        loadComponent: () => import('../app/fantasy-football/components/scores/scores.component').then(c => c.ScoresComponent)
      },
      {
          path: '',
          pathMatch: 'full',
          redirectTo: 'stats'
      }
  ]
  },
  {
    path: '',
    redirectTo: 'topics',
    pathMatch: 'full',
  },
];


export const appConfig: ApplicationConfig = { 
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes),
      StoreModule.forRoot({}),
      EffectsModule.forRoot([]),
      StoreDevtoolsModule.instrument({}),
      HttpClientModule,
      BrowserAnimationsModule
    ),
  ],
};
