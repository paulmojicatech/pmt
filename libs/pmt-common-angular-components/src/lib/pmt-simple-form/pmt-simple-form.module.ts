import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmtSimpleFormComponent } from './pmt-simple-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PmtInputModule } from '../pmt-input/pmt-input.module';

@NgModule({
  declarations: [PmtSimpleFormComponent],
  imports: [CommonModule, ReactiveFormsModule, PmtInputModule],
})
export class PmtSimpleFormModule {}
