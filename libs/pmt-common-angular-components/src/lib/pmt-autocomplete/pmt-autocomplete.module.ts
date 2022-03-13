import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmtAutocompleteComponent } from './pmt-autocomplete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [PmtAutocompleteComponent],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [PmtAutocompleteComponent],
})
export class PmtAutocompleteModule {}
