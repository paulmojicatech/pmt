import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PmtInputModule } from '@pmt/pmt-input';
import { PmtMobileToolbarModule } from '@pmt/pmt-mobile-toolbar';
import { CurrentListComponent } from './current-list.component';

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
    RouterModule.forChild(routes),
  ],
})
export class CurrentListModule {}
