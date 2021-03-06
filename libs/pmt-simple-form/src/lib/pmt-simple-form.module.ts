import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmtSimpleFormComponent } from './pmt-simple-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PmtInputModule } from '@pmt/pmt-input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [PmtSimpleFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PmtInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  exports: [PmtSimpleFormComponent],
})
export class PmtSimpleFormModule {}
