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

let indexId = 0;

export abstract class UIElementBase<T> extends ValueAccessorBase<T> implements OnInit, OnDestroy {
  Mode = Mode;

  /**
   * The visualization mode. By default in EDIT mode is displayed
   * @type {Mode}
   */
  @Input() protected mode: Mode = Mode.EDIT;

  /**
   * The identifier of the field that will be used as formControlName
   */
  @Input() protected id = `txt-${indexId++}`;

  /**
   * The title of the field
   */
  @Input() protected title: string;

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

  protected get failures(): Observable<Array<string>> {
    return this.validate().map(v => Object.keys(v || []).map(k => {
      return message(v, k);
    }));
  }

  protected get mandatoryLabel() {
    if (this.validators && this.validators.length > 0) {
      return this.validators.filter(val => val instanceof RequiredValidator).length > 0 ? ' *' : '';
    }
    return '';
  }
}
