import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Route, RouterModule } from '@angular/router';
import { MarvelToolbarModule } from '@pmt/marvel-shared-components';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./characters/characters.module').then((m) => m.CharactersModule),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    MarvelToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
