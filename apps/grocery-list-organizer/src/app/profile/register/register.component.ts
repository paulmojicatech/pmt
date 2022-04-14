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

  readonly BUTTONS = [
    {
      text: 'Register',
      isPrimary: true,
    },
  ];

  formControls!: PmtFormControl[];

  constructor(public registerFormSvc: RegisterFormService) {}

  ngOnInit(): void {
    this.registerForm = this.registerFormSvc.buildForm();
    this.formControls = this.registerFormSvc.getFormControls();
  }
}
