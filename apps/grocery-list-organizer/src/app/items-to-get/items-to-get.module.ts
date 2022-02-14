import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsToGetComponent } from './items-to-get.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: ItemsToGetComponent,
  },
];

@NgModule({
  declarations: [ItemsToGetComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ItemsToGetModule {}
