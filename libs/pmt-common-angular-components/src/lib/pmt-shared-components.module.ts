import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmtCustomValidatorDirective } from './directives/pmt-custom-validator.directive';

@NgModule({
  declarations: [PmtCustomValidatorDirective],
  imports: [CommonModule],
  exports: [PmtCustomValidatorDirective],
})
export class PmtSharedComponentsModule {}
