import { ApplicationConfig } from '@angular/core';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { sharedReducer } from './app/ngrx/reducers/shared.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes),
      IonicModule.forRoot(),
      StoreModule.forRoot({}),
      StoreModule.forFeature('shared', sharedReducer),
      EffectsModule.forRoot([]),
      StoreDevtoolsModule.instrument({}),
      HttpClientModule,
      BrowserAnimationsModule
    ),
  ],
};
