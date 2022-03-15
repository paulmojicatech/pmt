import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmtMobileToolbarComponent } from './pmt-mobile-toolbar.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [PmtMobileToolbarComponent],
  imports: [CommonModule, IonicModule],
  exports: [PmtMobileToolbarComponent],
})
export class PmtMobileToolbarModule {}
