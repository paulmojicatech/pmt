import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  LoginFormService,
  LoginStateService,
} from '@pmt/pmt-login-shared-business-logic';

@Component({
  selector: 'pmt-login-wrapper',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    public loginStateSvc: LoginStateService,
    private _loginFormSvc: LoginFormService
  ) {}

  ngOnInit(): void {
    this.loginForm = this._loginFormSvc.buildLoginForm();
  }
}
