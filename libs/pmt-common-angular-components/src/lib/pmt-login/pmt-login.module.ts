import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmtLoginComponent } from './pmt-login.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { PmtInputModule } from '../pmt-input/pmt-input.module';

@NgModule({
  declarations: [PmtLoginComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, PmtInputModule],
  exports: [PmtLoginComponent],
})
export class PmtLoginModule {}
