import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersComponent } from './characters.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: CharactersComponent,
  },
];

@NgModule({
  declarations: [CharactersComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CharactersModule {}
