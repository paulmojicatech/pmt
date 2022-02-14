import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginFormService } from '@pmt/pmt-login-shared-business-logic';
import { LoginStateService } from '@pmt/pmt-login-shared-business-logic';

@Component({
  selector: 'pmt-mfe-login-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
})
export class RemoteEntryComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    public loginStateSvc: LoginStateService,
    private loginFormSvc: LoginFormService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.loginFormSvc.buildLoginForm();
  }
}
