import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  registerProfile,
  RegisterProfileHttpRequest,
} from '@pmt/grocery-list-organizer-business-logic-profile';
import { AppState } from '@pmt/marvel-shared-business-logic';
import { PmtFormControl } from '@pmt/pmt-simple-form';
import { crossFieldEqualValidator } from '../cusotm-validators/register.validators';

@Injectable({
  providedIn: 'root',
})
export class RegisterFormService {
  constructor(private _builder: FormBuilder, private _store: Store<AppState>) {}

  buildForm(): FormGroup {
    const registerForm = this._builder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      confirmEmail: [null, Validators.required],
      userName: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
    });
    registerForm.addValidators(
      crossFieldEqualValidator('confirmEmail', 'email', 'Emails do not match')
    );
    registerForm.addValidators(
      crossFieldEqualValidator(
        'confirmPassword',
        'password',
        'Passwords do not match'
      )
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
        id: 'firstName',
        name: 'firstName',
        type: 'text',
        validators: [
          {
            id: 'required',
            validator: Validators.required,
            errorMsg: 'Name is required',
          },
        ],
        label: 'First Name',
      },
      {
        id: 'lastName',
        name: 'lastName',
        type: 'text',
        validators: [
          {
            id: 'required',
            validator: Validators.required,
            errorMsg: 'Last name is required',
          },
        ],
        label: 'Last Name',
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
      {
        id: 'userName',
        name: 'userName',
        type: 'text',
        validators: [
          {
            id: 'required',
            validator: Validators.required,
            errorMsg: 'User name is required',
          },
        ],
        label: 'User Name',
      },
      {
        id: 'password',
        name: 'password',
        type: 'password',
        validators: [
          {
            id: 'required',
            validator: Validators.required,
            errorMsg: 'Password is required',
          },
        ],
        label: 'Password',
      },
      {
        id: 'confirmPassword',
        name: 'confirmPassword',
        type: 'password',
        validators: [
          {
            id: 'required',
            validator: Validators.required,
            errorMsg: 'Password is required',
          },
        ],
        label: 'Confirm Password',
      },
    ];
  }

  handleRegisterEvent(registerForm: FormGroup): void {
    const req: RegisterProfileHttpRequest = {
      firstName: registerForm.get('firstName')?.value,
      lastName: registerForm.get('lastName')?.value,
      email: registerForm.get('email')?.value,
      userId: registerForm.get('userName')?.value,
      password: registerForm.get('password')?.value,
    };
    this._store.dispatch(
      registerProfile({
        req,
        url: `http://fantalytic.io/security/user`,
      })
    );
  }
}
