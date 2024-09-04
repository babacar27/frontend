// password-match-validator.ts
import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
    const password = formGroup.get('password')?.value;
    const passwordConfirmation = formGroup.get('password_confirmation')?.value;

    return password && passwordConfirmation && password !== passwordConfirmation
      ? { 'mismatch': true }
      : null;
  };
}
