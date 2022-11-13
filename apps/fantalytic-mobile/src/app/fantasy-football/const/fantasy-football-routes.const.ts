import { Route } from '@angular/router';

export const fantasyFootballRoutes: Route[] = [
    {
        path: 'fantasy-football',
        loadComponent: () => import('../fantasy-football.component').then(c => c.FantasyFootballComponent)
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'fantasy-football'
    }
];
