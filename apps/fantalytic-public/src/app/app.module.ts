import { importProvidersFrom, NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { topicsReducer } from './topics/ngrx/reducer/topics.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TopicEffects } from './topics/ngrx/effects/topics.effects';

const routes: Route[] = [
  {
    path: 'topics',
    loadComponent: () => import('./topics/topics.component').then(mod => mod.TopicsComponent),
    providers: [
          importProvidersFrom(
            StoreModule.forFeature('topics', topicsReducer),
            EffectsModule.forFeature([TopicEffects])
        )
      ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'topics'
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule, 
    MatToolbarModule, 
    RouterModule.forRoot(routes), 
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({})
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
