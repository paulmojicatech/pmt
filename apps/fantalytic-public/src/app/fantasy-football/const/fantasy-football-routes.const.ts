import { Route } from "@angular/router";

export const FANTASY_FOOTBALL_ROUTES: Route[] = [
    {
        path: 'compare',
        loadComponent: () => import('../components/compare-players/compare-players.component').then(c => c.ComparePlayersComponent)
    },
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('../fantasy-football.component').then(c => c.FantasyFootballComponent)
    }
];