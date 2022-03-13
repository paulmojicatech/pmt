import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsToGetComponent } from './items-to-get.component';
import { Route, RouterModule } from '@angular/router';
import { PmtMobileToolbarModule } from '@pmt/pmt-common-angular-components';
import { IonicModule } from '@ionic/angular';
import { PmtAutocompleteModule } from '@pmt/pmt-common-angular-components';

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
    PmtMobileToolbarModule,
    IonicModule,
    PmtAutocompleteModule,
  ],
})
export class ItemsToGetModule {}
