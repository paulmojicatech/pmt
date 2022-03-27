import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PmtFormControl } from '@pmt/pmt-simple-form';
import { RegisterFormService } from '@pmt/pmt-login-shared-business-logic';

@Component({
  selector: 'pmt-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  readonly LINKED_ACCOUNT_CONTROL: PmtFormControl = {
    id: 'linkedAccount',
    name: 'linkedAccount',
    type: 'text',
    label: 'Link To',
  };
  readonly BUTTONS = [
    {
      text: 'Register',
      isPrimary: true,
    },
  ];

  formControls!: PmtFormControl[];

  constructor(private _registerFormSvc: RegisterFormService) {}

  ngOnInit(): void {
    this.registerForm = this._registerFormSvc.buildForm();
    this.registerForm = this._registerFormSvc.addControl(
      this.registerForm,
      this.LINKED_ACCOUNT_CONTROL
    );
    this.formControls = [
      ...this._registerFormSvc.getFormControls(),
      this.LINKED_ACCOUNT_CONTROL,
    ];
  }
}
