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
