import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PmtMobileToolbarModule } from '@pmt/pmt-mobile-toolbar';
import { PmtInputModule } from '@pmt/pmt-input';
import { CurrentListComponent } from './current-list.component';
import { StoreModule } from '@ngrx/store';
import { currentGroceryItemsReducer } from '@pmt/grocery-list-organizer-business-logic-current-grocery-items';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: CurrentListComponent,
  },
];

@NgModule({
  declarations: [CurrentListComponent],
  imports: [
    CommonModule,
    IonicModule,
    PmtMobileToolbarModule,
    PmtInputModule,
    StoreModule.forFeature('current-list', currentGroceryItemsReducer),
    RouterModule.forChild(routes),
  ],
})
export class CurrentListModule {}
