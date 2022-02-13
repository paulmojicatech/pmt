/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
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
  label = '';
  @Input()
  placeholder = '';
  @Input()
  isMobile = false;
  @Input()
  iconUrl?: string;

  @Output()
  touchEvent = new EventEmitter<void>();
  @Output()
  changeEvent = new EventEmitter<string>();

  private _val = '';

  set value(val: string) {
    if (val !== this._val) {
      this._val = val;
      this.onChange(val);
    }
  }

  onChange = (value: string) => {
    this.changeEvent.emit(value);
  };

  onTouch = () => {
    this.touchEvent.emit();
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.touchEvent = fn;
  }

  writeValue(value: string): void {
    this.onChange(value);
  }
}
