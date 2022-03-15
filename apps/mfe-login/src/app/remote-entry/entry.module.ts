import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PmtLoginModule } from '@pmt/pmt-login';
import { RemoteEntryComponent } from './entry.component';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: RemoteEntryComponent,
  },
];

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule,
    PmtLoginModule,
    ReactiveFormsModule,
  ],
  providers: [],
  exports: [RemoteEntryComponent],
})
export class RemoteEntryModule {}
