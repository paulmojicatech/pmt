import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RootEffects } from './effects/root.effects';
import { rootReducer } from './reducer/root.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({ rootReducer }),
    EffectsModule.forRoot([RootEffects]),
    StoreDevtoolsModule.instrument(),
  ],
  exports: [StoreModule, EffectsModule, StoreDevtoolsModule],
})
export class MarvelRootStateModule {}
