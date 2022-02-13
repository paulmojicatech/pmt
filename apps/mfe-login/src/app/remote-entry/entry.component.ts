import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginFormService } from '../services/login-form.service';
import { LoginStateService } from '../services/login-state.service';

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

  handleFormUpdate(controlName: string, value: string): void {
    this.loginForm.get(controlName)?.patchValue(value);
  }
}
