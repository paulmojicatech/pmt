import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./tab3.page').then(p => p.Tab3Page)
  }
];

