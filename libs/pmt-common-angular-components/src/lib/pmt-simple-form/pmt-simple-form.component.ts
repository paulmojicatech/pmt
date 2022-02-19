import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { crossFieldEqualValidator } from '@pmt/pmt-login-shared-business-logic';
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
}
