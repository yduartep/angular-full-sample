import {
  Component,
  Optional,
  Inject, Input
} from '@angular/core';

import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS, RequiredValidator,
} from '@angular/forms';

import {ValidationService} from '../../core/services/validation.service';
import {UIElementBase} from '../ui-element-base';
import {animations} from '../animations';

@Component({
  selector: 'ui-password',
  templateUrl: 'ui-password.html',
  animations,
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
