import {
  Component,
  Optional,
  Inject,
  Input, OnInit, SimpleChanges, OnChanges
} from '@angular/core';

import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS, RequiredValidator,
} from '@angular/forms';

import {ValidationService} from '../../core/services/validation.service';
import {UIElementBase} from '../ui-element-base';
import {animations} from '../animations';
import {CommonUtil} from '../../core/utilities/common.util';

@Component({
  selector: 'ui-select-number',
  templateUrl: './ui-select-number.html',
  animations,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: UISelectNumberComponent,
    multi: true,
  }],
})
export class UISelectNumberComponent extends UIElementBase<number> implements OnChanges {
  /**
   * List of objects to be used for initializing the select
   */
  @Input()
  data: Array<any> = [];

  /**
   * Name of the field that will be used as value
   */
  @Input()
  keyField: string;

  /**
   * Name of the text(s) to be used for display the text value
   */
  @Input()
  textFields: Array<string> = [];

  /**
   * Separator to be used when multiple texts to be displayed
   */
  @Input()
  separator: string;

  protected texts: string[] = [];

  constructor(@Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
              @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
              validationService: ValidationService) {
    super(validators, asyncValidators, validationService);
  }

  ngOnChanges(changes: SimpleChanges) {
    const dataChanged = changes['data'] && changes['data'].previousValue !== changes['data'].currentValue;
    if (dataChanged) {
      this.initialize();
    }
  }

  private initialize() {
    const that = this;
    this.texts = this.data.map(elem => that.textFields.map(textField => elem[textField]).join(this.separator));
  }

  getText(value: any): string {
    if (!CommonUtil.isEmpty(this.data)) {
      const selectedElem = this.data.find(elem => elem[this.keyField] === value);
      if (selectedElem && selectedElem.code !== '') {
        const result = this.textFields.map(textField => selectedElem[textField]);
        if (result) {
          return result.join(this.separator);
        }
      }
    }
    return '';
  }

  onValueChanged(value) {
    // convert string to int
    this.value = +value;
  }

  getSelectedText() {
    if (!CommonUtil.isEmpty(this.value)) {
      return this.getText(this.value);
    }
    return '';
  }
}
