import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'pmt-login',
  templateUrl: './pmt-login.component.html',
  styleUrls: ['./pmt-login.component.scss'],
})
export class PmtLoginComponent {
  @Input()
  loginForm!: FormGroup;
  @Input()
  isMobile = false;

  @Output()
  loginEvent = new EventEmitter<void>();
  @Output()
  registerEvent = new EventEmitter<void>();

  handleFormUpdate(controlName: string, value: string): void {
    this.loginForm.get(controlName)?.patchValue(value);
  }
}
