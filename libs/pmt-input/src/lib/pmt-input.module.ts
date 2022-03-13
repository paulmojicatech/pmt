import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PmtSharedComponentsModule } from '@pmt/pmt-common-angular-components';
import { InputComponent } from './input.component';
import { IonicModule } from '@ionic/angular';
@NgModule({
  declarations: [InputComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    IonicModule,
    PmtSharedComponentsModule,
  ],
  exports: [InputComponent],
})
export class PmtInputModule {}
