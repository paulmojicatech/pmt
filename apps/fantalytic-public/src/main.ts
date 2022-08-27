import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app/app.component';
import { fantasyFootballReducer } from './app/fantasy-football/ngrx/reducer/fantasy-football.reducer';
import { TopicEffects } from './app/topics/ngrx/effects/topics.effects';
import { topicsReducer } from './app/topics/ngrx/reducer/topics.reducer';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch((err) => console.error(err));

const routes: Route[] = [
  {
    path: 'topics',
    loadComponent: () => import('./app/topics/topics.component').then(a => a.TopicsComponent),
    providers: [
      importProvidersFrom(
        StoreModule.forFeature('topics', topicsReducer),
        EffectsModule.forFeature([TopicEffects])
      )
    ]
  },
  {
    path: 'fantasy-football',
    loadChildren: () => import('./app/fantasy-football/const/fantasy-football-routes.const').then(m => m.FANTASY_FOOTBALL_ROUTES),
    providers: [
      importProvidersFrom(
        StoreModule.forFeature('fantasy-football', fantasyFootballReducer)
      )
    ]
  },
  {
    path: '',
    redirectTo: 'topics',
    pathMatch: 'full'
  }
];

bootstrapApplication(
  AppComponent,
  {
    providers: [
      importProvidersFrom(
        RouterModule.forRoot(routes),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({}),
        HttpClientModule,
        BrowserAnimationsModule
      )
    ]
  }
)