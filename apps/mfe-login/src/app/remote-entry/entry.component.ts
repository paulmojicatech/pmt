import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'pmt-mfe-login-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
})
export class RemoteEntryComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private _builder: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this._builder.group({
      user: [null, Validators.required],
      password: [null, Validators.required],
    });

    this.loginForm.get('user')?.valueChanges.subscribe((value) => {
      console.log('FORM CH', value);
    });
  }
}
