import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmtCustomValidatorDirective } from './directives/pmt-custom-validator.directive';
import { PmtSearchValuePipe } from './pipes/search-value.pipe';

@NgModule({
  declarations: [PmtCustomValidatorDirective, PmtSearchValuePipe],
  imports: [CommonModule],
  exports: [PmtCustomValidatorDirective, PmtSearchValuePipe],
})
export class PmtSharedComponentsModule {}
