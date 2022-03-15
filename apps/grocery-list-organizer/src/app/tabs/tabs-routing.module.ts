import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'current-list',
        loadChildren: () =>
          import('../current-list/current-list.module').then(
            (m) => m.CurrentListModule
          ),
      },
      {
        path: 'items-to-get',
        loadChildren: () =>
          import('../items-to-get/items-to-get.module').then(
            (m) => m.ItemsToGetModule
          ),
      },
      {
        path: 'recipes',
        loadChildren: () =>
          import('../recipes/recipes.module').then((m) => m.RecipesModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfileModule),
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/tabs/current-list',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
