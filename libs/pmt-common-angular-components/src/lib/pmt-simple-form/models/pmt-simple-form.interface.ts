import { ValidatorFn } from '@angular/forms';

export interface PmtFormControl {
  type: PmtFormControlType;
  name: string;
  id: string;
  label: string;
  validators?: PmtFormControlValidator[];
  items?: { label: string; value: string }[];
}

export type PmtFormControlType =
  | 'text'
  | 'tel'
  | 'number'
  | 'email'
  | 'checkbox'
  | 'list';

export interface PmtFormControlValidator {
  id: string;
  validator?: ValidatorFn;
  errorMsg?: string;
}
