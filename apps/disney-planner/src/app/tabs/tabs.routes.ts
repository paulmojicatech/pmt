import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { fromUpcomingTrips, fromUpcomingTripsEffects } from 'disney-planner-trips-ngrx';

export const routes: Routes = [
  {
    path: 'tabs',
    loadComponent: () => import('./tabs.page').then(p => p.TabsPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('../home/home.page').then(p => p.HomePage),
        providers: [
          provideState(fromUpcomingTrips.upcomingTripsFeature),
          provideEffects([fromUpcomingTripsEffects.UpcomingTripsEffects])
        ]
      },
      {
        path: 'map',
        loadComponent: () => import('../map/map.page').then(p => p.MapPage)
      },
      {
        path: 'search',
        loadComponent: () => import('../search/search.page').then(p => p.SearchPage)
      },
      {
        path: 'account',
        loadComponent: () => import('../account/account.page').then(p => p.AccountPage)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

