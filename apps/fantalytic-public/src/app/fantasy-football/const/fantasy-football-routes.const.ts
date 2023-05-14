import { Route } from "@angular/router";

export const FANTASY_FOOTBALL_ROUTES: Route[] = [    
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('../fantasy-football.component').then(c => c.FantasyFootballComponent)
    }
];