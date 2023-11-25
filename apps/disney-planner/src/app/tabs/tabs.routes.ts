import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tabs',
    loadComponent: () => import('./tabs.page').then(p => p.TabsPage),
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.routes').then(r => r.routes)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.routes').then(r => r.routes)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.routes').then(r => r.routes)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

