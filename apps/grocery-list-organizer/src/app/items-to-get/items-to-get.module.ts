import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsToGetComponent } from './items-to-get.component';
import { Route, RouterModule } from '@angular/router';
import { PmtMobileToolbarModule } from '@pmt/pmt-mobile-toolbar';
import { IonicModule } from '@ionic/angular';
import { PmtAutocompleteModule } from '@pmt/pmt-autocomplete';
import { StoreModule } from '@ngrx/store';
import {
  itemsToGetReducer,
  ItemsToGetEffects,
} from '@pmt/grocery-list-organizer-business-logic-items-to-get';
import { EffectsModule } from '@ngrx/effects';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: ItemsToGetComponent,
  },
];

@NgModule({
  declarations: [ItemsToGetComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('items-to-get', itemsToGetReducer),
    EffectsModule.forFeature([ItemsToGetEffects]),
    PmtMobileToolbarModule,
    IonicModule,
    PmtAutocompleteModule,
  ],
})
export class ItemsToGetModule {}
