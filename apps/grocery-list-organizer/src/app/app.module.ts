import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  GlobalEffects,
  globalReducer,
} from '@pmt/grocery-list-organizer-shared-business-logic';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    StoreModule.forRoot({ app: globalReducer }),
    EffectsModule.forRoot([GlobalEffects]),
    StoreDevtoolsModule.instrument({}),
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
