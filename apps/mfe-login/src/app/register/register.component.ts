import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PmtFormControl } from '@pmt/pmt-common-angular-components';

@Component({
  selector: 'pmt-register-wrapper',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  readonly FORM_CONTROLS: PmtFormControl[] = [
    {
      id: 'email',
      name: 'email',
      type: 'email',
      validators: [
        {
          id: 'required',
          validator: Validators.required,
          errorMsg: 'Email is required',
        },
      ],
      label: 'Email',
    },
  ];

  registerForm!: FormGroup;

  constructor(private _builder: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this._builder.group({
      email: [null],
    });
  }
}
