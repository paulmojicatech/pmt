import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { PmtFormControl } from '@pmt/pmt-simple-form';
import { crossFieldEqualValidator } from '../cusotm-validators/register.validators';

@Injectable({
  providedIn: 'root',
})
export class RegisterFormService {
  constructor(private _builder: FormBuilder) {}

  buildForm(): FormGroup {
    const registerForm = this._builder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      confirmEmail: [null, Validators.required],
    });
    registerForm.addValidators(
      crossFieldEqualValidator('confirmEmail', 'email', 'Emails do not match')
    );
    return registerForm;
  }

  addControl(currentForm: FormGroup, formControl: PmtFormControl): FormGroup {
    const newFormControl = new FormControl([null]);
    const validatorsToAdd = formControl.validators?.map((validator) => {
      return validator.validator as ValidatorFn;
    });
    if (validatorsToAdd?.length) {
      newFormControl.addValidators(validatorsToAdd);
    }
    currentForm.addControl(formControl.id, newFormControl);
    return currentForm;
  }

  addFormControlValidator(
    currentForm: FormGroup,
    controlName: string,
    validator: ValidatorFn
  ): FormGroup {
    currentForm.get(controlName)?.addValidators(validator);
    return currentForm;
  }

  getFormControls(): PmtFormControl[] {
    return [
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
        type: 'text',
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
        type: 'text',
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
  }
}
