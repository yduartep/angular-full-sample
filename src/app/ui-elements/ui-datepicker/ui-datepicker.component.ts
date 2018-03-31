import {
  Component,
  Optional,
  Inject, Input, EventEmitter, AfterViewInit
} from '@angular/core';

import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS, RequiredValidator,
} from '@angular/forms';

import {ValidationService} from '../../core/services/validation.service';
import {UIElementBase} from '../ui-element-base';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'ui-datepicker',
  templateUrl: './ui-datepicker.component.html',
  styleUrls: ['./ui-datepicker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: UIDatePickerComponent,
    multi: true
  }]
})
export class UIDatePickerComponent extends UIElementBase<Date> implements AfterViewInit {
  @Input() placeholder = '';
  @Input() focus = false;
  @Input() minDate: Date;
  @Input() maxDate: Date;

  bsConfig: Partial<BsDatepickerConfig>;
  public focusOnField = new EventEmitter<boolean>();

  constructor(@Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
              @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
              validationService: ValidationService) {
    super(validators, asyncValidators, validationService);
  }

  ngAfterViewInit() {
    this.focusOnField.emit(this.focus);
  }
}
