import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PmtCustomValidatorDirective } from '../directives/pmt-custom-validator.directive';
import { PmtSharedComponentsModule } from '../pmt-shared-components.module';
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
