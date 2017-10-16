import {Directive} from '@angular/core';
import {
  NG_VALIDATORS,
  AbstractControl,
} from '@angular/forms';


@Directive({
  selector: '[passwordValidator][ngModel]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: PasswordValidatorDirective, multi: true}
  ]
})
export class PasswordValidatorDirective {
  validate(control: AbstractControl): { [ validator: string ]: string } {
    const expression = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/i;
    if (!control || !control.value) { // the [required] validator will check presence, not us
      return null;
    }

    const value = control.value.trim();
    if (expression.test(value)) {
      return null;
    }
    return {passwordValidator: 'Password must be at least 6 characters long, and contain a number.'};
  }
}
