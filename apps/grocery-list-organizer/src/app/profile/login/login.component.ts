import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '@pmt/grocery-list-organizer-business-logic-profile';
import { AppState } from '@pmt/marvel-shared-business-logic';
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
    private _loginFormSvc: LoginFormService,
    private _store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loginForm = this._loginFormSvc.buildLoginForm();
  }

  handleLoginEvent(): void {
    this._store.dispatch(
      login({
        userName: this.loginForm.get('user')?.value,
        password: this.loginForm.get('password')?.value,
      })
    );
  }
}
