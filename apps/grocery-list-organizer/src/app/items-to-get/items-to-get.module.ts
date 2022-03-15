import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { PmtInputModule } from '@pmt/pmt-input';
import { PmtSharedComponentsModule } from '@pmt/pmt-common-angular-components';

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
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('items-to-get', itemsToGetReducer),
    EffectsModule.forFeature([ItemsToGetEffects]),
    PmtMobileToolbarModule,
    PmtSharedComponentsModule,
    PmtInputModule,
    MatButtonModule,
    IonicModule,
    PmtAutocompleteModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ItemsToGetModule {}
