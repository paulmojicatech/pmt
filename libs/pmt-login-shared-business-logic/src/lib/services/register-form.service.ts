import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { PmtFormControl } from '@pmt/pmt-common-angular-components';
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
}
