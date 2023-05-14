import { appConfig } from './app/app.config';

import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { TopicEffects } from './app/topics/ngrx/effects/topics.effects';
import { topicsReducer } from './app/topics/ngrx/reducer/topics.reducer';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const routes: Route[] = [
  {
    path: 'tabs',
    loadComponent: () => import('./app/tabs/tabs.page').then((p) => p.TabsPage),
    children: [
      {
        path: 'topics',
        loadComponent: () =>
          import('./app/topics/topics.component').then(
            (c) => c.TopicsComponent
          ),
        providers: [
          importProvidersFrom(
            StoreModule.forFeature('topics', topicsReducer),
            EffectsModule.forFeature([TopicEffects])
          ),
        ],
      },
      {
        path: 'fantasy-football',
        loadChildren: () =>
          import(
            './app/fantasy-football/const/fantasy-football-routes.const'
          ).then((m) => m.fantasyFootballRoutes),
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tabs/topics',
  },
];

bootstrapApplication(AppComponent, appConfig);
