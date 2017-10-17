import {Directive} from '@angular/core';
import {
  NG_VALIDATORS,
  AbstractControl,
} from '@angular/forms';

const moment = require('moment');
import {DateUtil} from '../../core/utilities/date.util';

@Directive({
  selector: '[dateValidator][ngModel]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: DateValidatorDirective, multi: true}
  ]
})
export class DateValidatorDirective {
  validate(control: AbstractControl): { [ validator: string ]: string } {
    if (!control || !control.value) { // the [required] validator will check presence, not us
      return null;
    }
    if (moment.isMoment(control.value) && control.value.isValid()) {
      return null;
    }
    if (typeof control.value === 'string' && moment(control.value.trim(), DateUtil.FORMAT_DATE, true).isValid()) {
      return null;
    }
    if (moment(control.value).isValid()) {
      return null;
    }
    return {dateValidator: 'Please enter a valid date (format: ' + DateUtil.FORMAT_DATE + ')'};
  }
}
