import {Component, Inject, Input, OnChanges, OnInit, Optional, SimpleChanges} from '@angular/core';
import {NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ValidationService} from '../../core/services/validation.service';
import {UIElementBase} from '../ui-element-base';
import {CommonUtil} from '../../core/utilities/common.util';
import {KeyText} from '../../core/models/key-text';

@Component({
  selector: 'ui-select',
  templateUrl: './ui-select.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: UISelectComponent,
    multi: true,
  }]
})
export class UISelectComponent extends UIElementBase<number> implements OnChanges, OnInit {
  /**
   * List of objects to be used for initializing the select
   */
  @Input()
  data: Array<any> = [];

  /**
   * Name of the field that will be used as value
   */
  @Input()
  keyField = 'id';

  /**
   * Name of the field(s) to be used for display the text value
   */
  @Input()
  textField: string | Array<string> = ['text'];

  /**
   * Separator to be used when multiple texts to be displayed
   */
  @Input()
  separator: string;

  /**
   * the final values to be used in select
   * @type {Array}
   */
  values: Array<KeyText<number>>;

  constructor(@Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
              @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
              validationService: ValidationService) {
    super(validators, asyncValidators, validationService);
  }

  ngOnInit() {
    super.ngOnInit();

    this.initialize();
  }

  ngOnChanges(changes: SimpleChanges) {
    const dataChanged = changes['data']
      && changes['data'].previousValue
      && changes['data'].previousValue !== changes['data'].currentValue;
    if (dataChanged) {
      this.initialize();
    }
  }

  /**
   * Update the value on change
   * @param selected the selected value
   */
  onValueChanged(selected) {
    this.value = +selected;
  }

  /**
   * initialize elements
   */
  private initialize() {
    if (CommonUtil.isArray(this.textField)) {
      const fields = this.textField as string[];
      this.values = this.data.map(elem => {
        const id = this.data[this.keyField];
        return new KeyText<number>(id, fields.map(f => elem[f]).join(this.separator), this.value === id);
      });
    } else {
      this.values = this.data.map(elem => {
        return new KeyText<number>(elem[this.keyField], elem[this.textField as string], this.value === elem[this.keyField]);
      });
    }
  }

  /**
   * Get the text of specific selected value
   * @param value the value
   * @returns {string} the text
   */
  getText(value: any): string {
    if (!CommonUtil.isEmpty(this.values)) {
      return this.values.find(elem => elem.id === value).text;
    }
    return '';
  }

  /**
   * Get the selected text
   * @returns {any} the text selected
   */
  getSelectedText() {
    if (this.value > 0) {
      return this.getText(this.value);
    }
    return '';
  }
}
