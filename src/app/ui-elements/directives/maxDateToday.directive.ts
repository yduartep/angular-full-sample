import {Directive} from '@angular/core';
import {
  NG_VALIDATORS,
  AbstractControl,
} from '@angular/forms';
import {DateUtil} from '../../core/utilities/date.util';

const moment = require('moment');

@Directive({
  selector: '[maxDateToday][ngModel]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: MaxDateTodayValidatorDirective, multi: true}
  ]
})
export class MaxDateTodayValidatorDirective {
  validate(control: AbstractControl): { [ validator: string ]: string } {
    if (!control || !control.value) { // the [required] validator will check presence, not us
      return null;
    }

    const value = control.value.trim();
    if (moment(value, DateUtil.FORMAT_DATE) <= moment(moment(), DateUtil.FORMAT_DATE)) {
      return null;
    }
    return {maxDateToday: 'The date must be less or equal than current date'};
  }
}
