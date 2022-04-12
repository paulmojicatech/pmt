import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PmtFormControl } from './models/pmt-simple-form.interface';

@Component({
  selector: 'pmt-simple-form',
  templateUrl: './pmt-simple-form.component.html',
  styleUrls: ['./pmt-simple-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PmtSimpleFormComponent {
  @Input()
  parentForm!: FormGroup;
  @Input()
  isMobile = false;
  @Input()
  formControls: PmtFormControl[] = [];
  @Input()
  buttons: { text: string; isPrimary: boolean }[] = [];

  @Output()
  actionEv = new EventEmitter<{ isPrimary: boolean }>();
}
