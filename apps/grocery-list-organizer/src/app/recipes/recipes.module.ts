import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: RecipesComponent,
  },
];

@NgModule({
  declarations: [RecipesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class RecipesModule {}
