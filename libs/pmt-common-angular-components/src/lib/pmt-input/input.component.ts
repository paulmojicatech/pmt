/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
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
export class InputComponent {
  @Input()
  type: PmtInputType = 'text';

  @Output()
  touchEvent = new EventEmitter<void>();
  @Output()
  changeEvent = new EventEmitter<string>();
}
