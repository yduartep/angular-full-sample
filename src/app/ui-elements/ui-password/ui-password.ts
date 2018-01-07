import {Component, Inject, Input, Optional} from '@angular/core';
import {NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ValidationService} from '../../core/services/validation.service';
import {UIElementBase} from '../ui-element-base';

@Component({
  selector: 'ui-password',
  templateUrl: 'ui-password.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: UIPasswordComponent,
    multi: true,
  }]
})
export class UIPasswordComponent extends UIElementBase<string> {
  @Input() placeholder = '';

  constructor(@Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
              @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
              validationService: ValidationService) {
    super(validators, asyncValidators, validationService);
  }
}
