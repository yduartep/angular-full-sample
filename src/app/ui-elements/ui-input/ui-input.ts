import {AfterViewInit, Component, EventEmitter, Inject, Input, Optional} from '@angular/core';
import {NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ValidationService} from '../../core/services/validation.service';
import {UIElementBase} from '../ui-element-base';

@Component({
  selector: 'ui-input',
  templateUrl: './ui-input.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: UIInputComponent,
    multi: true
  }]
})
export class UIInputComponent extends UIElementBase<string> implements AfterViewInit {
  @Input() placeholder = '';
  @Input() focus = false;
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
