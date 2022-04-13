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
import {
  CurrentGroceryItemsEffects,
  currentGroceryItemsReducer,
} from '@pmt/grocery-list-organizer-business-logic-current-grocery-items';
import { HttpClientModule } from '@angular/common/http';

import { HTTP } from '@awesome-cordova-plugins/http/ngx/index';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    StoreModule.forRoot({
      app: globalReducer,
      'current-list': currentGroceryItemsReducer,
    }),
    HttpClientModule,
    EffectsModule.forRoot([GlobalEffects, CurrentGroceryItemsEffects]),
    StoreDevtoolsModule.instrument({}),
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HTTP,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
