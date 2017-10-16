import {
  Component,
  Optional,
  Inject,
  Input, OnInit, SimpleChanges, OnChanges, ChangeDetectionStrategy
} from '@angular/core';

import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS, RequiredValidator,
} from '@angular/forms';

import {ValidationService} from '../../core/services/validation.service';
import {UIElementBase} from '../ui-element-base';
import {animations} from '../animations';
import {Mode} from '../../core/models/mode.enum';
import {CommonUtil} from '../../core/utilities/common.util';

@Component({
  selector: 'ui-select',
  templateUrl: './ui-select.html',
  animations,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: UISelectComponent,
    multi: true,
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UISelectComponent extends UIElementBase<number> implements OnChanges {
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
   * Name of the field(s) to be used for display the text value
   */
  @Input()
  textField: string | Array<string> = [];

  /**
   * Separator to be used when multiple texts to be displayed
   */
  @Input()
  separator: string;

  /**
   * The list of texts to be used in the select
   * @type {Array}
   */
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

  /**
   * initialize elements
   */
  private initialize() {
    if (CommonUtil.isArray(this.textField)) {
      const fields = this.textField as string[];
      this.texts = this.data.map(elem => fields.map(f => elem[f]).join(this.separator));
    } else {
      this.texts = this.data.map(elem => elem[this.textField as string]);
    }
  }

  onValueChanged(value) {
    // convert string to int
    this.value = +value;
  }

  /**
   * Get the text of specific selected value
   * @param value the value
   * @returns {string} the text
   */
  getText(value: any): string {
    if (!CommonUtil.isEmpty(this.data)) {
      return this.data.find(elem => elem[this.keyField] === value);
    }
    return '';
  }

  /**
   * Get the selected text
   * @returns {any} the text selected
   */
  getSelectedText() {
    if (!CommonUtil.isEmpty(this.value)) {
      return this.getText(this.value);
    }
    return '';
  }
}
