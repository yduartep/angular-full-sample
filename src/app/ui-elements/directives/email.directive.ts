import {Directive} from '@angular/core';
import {
  NG_VALIDATORS,
  AbstractControl,
} from '@angular/forms';


@Directive({
  selector: '[emailValidator][ngModel]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true}
  ]
})
export class EmailValidatorDirective {
  validate(control: AbstractControl): { [ validator: string ]: string } {
    const expression = /^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/i; // tslint:disable-line
    if (!control || !control.value) { // the [required] validator will check presence, not us
      return null;
    }

    const value = control.value.trim();
    if (expression.test(value)) {
      return null;
    }
    return {emailValidator: 'Please enter a valid email address'};
  }
}
