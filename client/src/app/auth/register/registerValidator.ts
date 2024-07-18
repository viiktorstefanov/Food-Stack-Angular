import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordValidator {
  static strong(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecial = /[\W_]/.test(value);
    const isValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;

    return !isValid ? { strong: true } : null;
  }
}