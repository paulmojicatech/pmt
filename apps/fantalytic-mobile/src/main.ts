import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app/app.component';
import { TopicEffects } from './app/topics/ngrx/effects/topics.effects';
import { topicsReducer } from './app/topics/ngrx/reducer/topics.reducer';
import { environment } from './environments/environment';
import { IonicModule } from '@ionic/angular';

if (environment.production) {
  enableProdMode();
}

const routes: Route[] = [
  {
    path: 'tabs',
    loadComponent: () => import('./app/tabs/tabs.page').then(p => p.TabsPage),
    children: [
      {
        path: 'topics',
        loadComponent: () => import('./app/topics/topics.component').then(c => c.TopicsComponent),
        providers: [
          importProvidersFrom(
            StoreModule.forFeature('topics', topicsReducer),
            EffectsModule.forFeature([TopicEffects])
          )
        ]
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tabs/topics'
  },
  // {
  //   path: 'fantasy-football',
  //   loadChildren: () => import('./app/fantasy-football/const/fantasy-football-routes.const').then(m => m.FANTASY_FOOTBALL_ROUTES),
  //   canActivate: [MobileCheckerService],
  //   providers: [
  //     importProvidersFrom(
  //       StoreModule.forFeature('fantasy-football', fantasyFootballReducer),
  //       EffectsModule.forFeature([FantasyFootballEffects])
  //     )
  //   ]
  // }
];

bootstrapApplication(
  AppComponent,
  {
    providers: [
      importProvidersFrom(
        RouterModule.forRoot(routes),
        IonicModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({}),
        HttpClientModule,
        BrowserAnimationsModule
      )
    ]
  }
);
