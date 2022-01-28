import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemoteEntryComponent } from './entry.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: RemoteEntryComponent
  }
];

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RemoteEntryComponent],
})
export class RemoteEntryModule {}
