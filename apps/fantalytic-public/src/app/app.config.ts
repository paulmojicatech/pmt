import { HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule, provideRouter } from '@angular/router';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { StoreModule, provideStore } from '@ngrx/store';
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
    loadChildren: () =>
      import('../app/fantasy-football/const/fantasy-football-routes.const').then(
        (m) => m.FANTASY_FOOTBALL_ROUTES
      ),
    canActivate: [MobileCheckerService],
    providers: [
      importProvidersFrom(
        StoreModule.forFeature('fantasyFootball', fantasyFootballReducer),
        EffectsModule.forFeature([FantasyFootballEffects]),
      )      
    ],
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
