import {Directive} from '@angular/core';
import {
  NG_VALIDATORS,
  AbstractControl,
} from '@angular/forms';


@Directive({
  selector: '[hexadecimal][ngModel]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: HexadecimalValidatorDirective, multi: true}
  ]
})
export class HexadecimalValidatorDirective {
  validate(control: AbstractControl): { [ validator: string ]: string } {
    const expression = /^([0-9a-fA-F]+)$/i;
    if (!control || !control.value) { // the [required] validator will check presence, not us
      return null;
    }

    const value = typeof control.value === 'string' ? control.value.trim() : control.value;
    if (expression.test(value)) {
      return null;
    }
    return {hexadecimal: 'Please enter a hexadecimal value (alphanumeric, 0-9 and A-F)'};
  }
}
