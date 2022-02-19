import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { crossFieldEqualValidator } from '@pmt/pmt-login-shared-business-logic';
import { PmtFormControl } from './models/pmt-simple-form.interface';

@Component({
  selector: 'pmt-simple-form',
  templateUrl: './pmt-simple-form.component.html',
  styleUrls: ['./pmt-simple-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PmtSimpleFormComponent implements OnInit {
  @Input()
  parentForm!: FormGroup;
  @Input()
  isMobile = false;
  @Input()
  customControls: PmtFormControl[] = [];

  readonly DEFAULT_FORM_CONTROLS: PmtFormControl[] = [
    {
      id: 'name',
      name: 'name',
      type: 'text',
      validators: [
        {
          id: 'required',
          validator: Validators.required,
          errorMsg: 'Name is required',
        },
      ],
      label: 'Name',
    },
    {
      id: 'email',
      name: 'email',
      type: 'email',
      validators: [
        {
          id: 'required',
          validator: Validators.required,
          errorMsg: 'Email is required',
        },
      ],
      label: 'Email',
    },
    {
      id: 'confirmEmail',
      name: 'confirmEmail',
      type: 'email',
      validators: [
        {
          id: 'required',
          validator: crossFieldEqualValidator(
            'confirmEmail',
            'email',
            'Email field does not match.'
          ),
          errorMsg: 'Email field does not match.',
        },
      ],
      label: 'Confirm email',
    },
  ];

  formControls = this.DEFAULT_FORM_CONTROLS;

  ngOnInit(): void {
    if (this.customControls?.length) {
      this.formControls = [...this.formControls, ...this.customControls];
    }
  }
}
