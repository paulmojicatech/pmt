import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { PmtInputType } from './models/pmt-input.interface';

@Component({
  selector: 'pmt-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input()
  type: PmtInputType = 'text';

  @Input()
  controlName = '';

  @Input()
  parentForm?: FormGroup;

  val: string | number = '';
  set value(val: string | number) {
    if (val !== undefined && this.val !== val) {
      this.val = val;
      this.onChange(val);
      this.onTouch();
    }
  }

  onChange = (value: string | number) => {
    console.log('CHANGED');
    this.writeValue(value);
    // this.parentForm?.get(this.controlName)?.patchValue(value);
  };

  onTouch = () => {
    console.log('TOUCHED');
  };

  registerOnChange(fn: any): void {
    console.log('REG ON CH');
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    console.log('REG ON T');
    this.onTouch = fn;
  }

  writeValue(value: string | number): void {
    console.log(value);
    
  }
}
