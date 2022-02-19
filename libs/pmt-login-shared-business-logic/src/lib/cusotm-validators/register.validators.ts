import { AbstractControl, ValidatorFn } from '@angular/forms';

export function crossFieldEqualValidator(
  controlName: string,
  compareControlName: string,
  errorMsg: string
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: string } | null => {
    console.log('CONTROL', control);
    const firstControl = control.get(controlName);
    const dependentControl = control.get(compareControlName);
    if (firstControl?.value !== dependentControl?.value) {
      return { fieldsDoNotMatch: errorMsg };
    }
    return null;
  };
}
