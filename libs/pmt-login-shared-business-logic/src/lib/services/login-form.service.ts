import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class LoginFormService {
  constructor(private _builder: FormBuilder) {}

  buildLoginForm(): FormGroup {
    const loginForm = this._builder.group({
      user: [null, Validators.required],
      password: [null, Validators.required],
    });

    return loginForm;
  }
}
