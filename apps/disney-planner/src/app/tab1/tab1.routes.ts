import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./tab1.page').then(p => p.Tab1Page)
  }
];

