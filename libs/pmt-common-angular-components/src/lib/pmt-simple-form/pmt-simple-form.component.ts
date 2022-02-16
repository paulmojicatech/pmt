import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';
import { PmtFormControl } from './models/pmt-simple-form.interface';

@Component({
  selector: 'pmt-simple-form',
  templateUrl: './pmt-simple-form.component.html',
  styleUrls: ['./pmt-simple-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PmtSimpleFormComponent implements OnInit {
  @Input()
  formControls!: PmtFormControl[];
  @Input()
  parentForm!: FormGroup;
  @Input()
  isMobile = false;

  ngOnInit(): void {
    this.setValidators();
  }

  private setValidators(): void {
    this.formControls?.forEach((ctl) => {
      if (ctl.validators?.length) {
        const currentControl = this.parentForm.get(ctl.name);
        ctl.validators.forEach((validator) => {
          const validatorToAdd = validator.validator as ValidatorFn;
          currentControl?.addValidators(validatorToAdd);
        });
      }
    });
  }
}
