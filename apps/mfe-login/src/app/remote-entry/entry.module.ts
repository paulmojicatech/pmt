import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoteEntryComponent } from './entry.component';
import { Route, RouterModule } from '@angular/router';
import { PmtInputModule } from '@pmt/pmt-common-angular-components';
import { ReactiveFormsModule } from '@angular/forms';

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
    PmtInputModule,
    ReactiveFormsModule,
  ],
  providers: [],
  exports: [RemoteEntryComponent],
})
export class RemoteEntryModule {}
