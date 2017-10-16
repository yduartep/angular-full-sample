import {
  Component,
  Optional,
  Inject,
} from '@angular/core';

import {
  NgModel,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS, RequiredValidator,
} from '@angular/forms';

import { ValidationService } from '../../core/services/validation.service';
import { UIElementBase } from '../ui-element-base';
import { animations } from '../animations';

@Component({
  selector: 'ui-number-picker',
  templateUrl: 'ui-number-picker.html',
  animations,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: UINumberPickerComponent,
    multi: true,
  }],
})
export class UINumberPickerComponent extends UIElementBase<number> {

  constructor( @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
    validationService: ValidationService) {
    super(validators, asyncValidators, validationService);
  }

  onValueChanged(value) {
    // convert string to int
    this.value = +value;
  }
}
