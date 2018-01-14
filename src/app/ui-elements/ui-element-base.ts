import {
  Input,
  ViewChild,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  NgModel,
  RequiredValidator,
} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import {ValidationService} from '../core/services/validation.service';
import {ValueAccessorBase} from './value-accessor';

import {
  AsyncValidatorArray,
  ValidatorArray,
  ValidationResult,
  message,
  validate,
} from './validate';
import {Mode} from '../core/models/mode.enum';
import {isNullOrUndefined} from 'util';

let indexId = 0;

export abstract class UIElementBase<T> extends ValueAccessorBase<T> implements OnInit, OnDestroy {
  Mode = Mode;

  /**
   * The visualization mode. By default in EDIT mode is displayed
   * @type {Mode}
   */
  @Input() mode: Mode = Mode.EDIT;

  /**
   * The identifier of the field that will be used as formControlName
   */
  @Input() id = `txt-${indexId++}`;

  /**
   * The title of the field
   */
  @Input() title: string;

  /**
   * The custom messages for specific validations
   */
  @Input() protected dataErrorRequired = 'This field is mandatory';
  @Input() protected dataErrorPattern = 'Value does not match required pattern';
  @Input() protected dataErrorMinlength = 'Value must have at least N characters';
  @Input() protected dataErrorMaxlength = 'Value can\' have more than N characters';
  @Input() protected dataErrorNumeric;
  @Input() protected dataErrorDate;
  @Input() protected dataErrorEmail;
  @Input() protected dataErrorHexadecimal;
  @Input() protected dataErrorMaxDateToday;
  @Input() protected dataErrorPassword;

  /**
   * The ng model
   */
  @ViewChild(NgModel) protected model: NgModel;

  constructor(protected validators: ValidatorArray,
              protected asyncValidators: AsyncValidatorArray,
              protected validationService: ValidationService) {
    super();
  }

  ngOnInit() {
    this.validationService.subscribe(this);
  }

  ngOnDestroy() {
    this.validationService.unsubscribe(this);
  }

  protected validate(): Observable<ValidationResult> {
    if (this.model && this.model.control.touched) {
      return validate(this.validators, this.asyncValidators)(this.model.control);
    }
    return Observable.empty<ValidationResult>();
  }

  protected get invalid(): Observable<boolean> {
    return this.validate().map(v => Object.keys(v || {}).length > 0);
  }

  /**
   * Get the custom error message
   * @param {ValidationResult} validator the validator
   * @param {string} key the validator name
   * @returns {string} the error message
   */
  private getErrorMsg(validator: ValidationResult, key: string): string {
    const that = this;
    let errorMsg: string;
    switch (key) {
      case 'required':
        errorMsg = that.dataErrorRequired;
        break;
      case 'pattern':
        errorMsg = that.dataErrorPattern;
        break;
      case 'minlength':
        errorMsg = that.dataErrorMinlength;
        break;
      case 'maxlength':
        errorMsg = that.dataErrorMaxlength;
        break;
      case 'numeric':
        errorMsg = that.dataErrorNumeric;
        break;
      case 'dateValidator':
        errorMsg = that.dataErrorDate;
        break;
      case 'emailValidator':
        errorMsg = that.dataErrorEmail;
        break;
      case 'hexadecimal':
        errorMsg = that.dataErrorHexadecimal;
        break;
      case 'maxDateToday':
        errorMsg = that.dataErrorMaxDateToday;
        break;
      case 'passwordValidator':
        errorMsg = that.dataErrorPassword;
        break;
    }
    if (isNullOrUndefined(errorMsg)) {
      if (typeof validator[key] === 'string') {
        errorMsg = <string>validator[key];
      } else {
        errorMsg = `Validation failed: ${key}`;
      }
    }
    return errorMsg;
  }

  protected get failures(): Observable<Array<string>> {
    const that = this;
    return this.validate().map(v => Object.keys(v || []).map(k => that.getErrorMsg(v, k)));
  }

  protected get mandatoryLabel() {
    if (this.validators && this.validators.length > 0) {
      return this.validators.filter(val => val instanceof RequiredValidator).length > 0 ? ' *' : '';
    }
    return '';
  }
}
