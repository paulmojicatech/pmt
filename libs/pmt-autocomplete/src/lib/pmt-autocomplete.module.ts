import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmtAutocompleteComponent } from './pmt-autocomplete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PmtSharedComponentsModule } from '@pmt/pmt-common-angular-components';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PmtAutocompleteComponent],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    PmtSharedComponentsModule,
    ReactiveFormsModule,
  ],
  exports: [PmtAutocompleteComponent],
})
export class PmtAutocompleteModule {}
