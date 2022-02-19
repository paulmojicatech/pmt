import { AbstractControl, ValidatorFn } from '@angular/forms';

export const crossFieldEqualValidator = (
  controlName: string,
  compareControlName: string,
  errorMsg: string
): ValidatorFn => {
  return (control: AbstractControl) => {
    const firstControl = control.get(controlName);
    const dependentControl = control.get(compareControlName);
    if (firstControl?.value !== dependentControl?.value) {
      return { fieldsDoNotMatch: errorMsg };
    }
    return null;
  };
};
