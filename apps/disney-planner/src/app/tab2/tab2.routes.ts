import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./tab2.page').then(p => p.Tab2Page),
  }
];

