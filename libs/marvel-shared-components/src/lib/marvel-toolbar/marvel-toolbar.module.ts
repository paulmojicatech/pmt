import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarvelToolbarComponent } from './marvel-toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [MarvelToolbarComponent],
  imports: [CommonModule, MatToolbarModule],
  exports: [MarvelToolbarComponent],
})
export class MarvelToolbarModule {}
