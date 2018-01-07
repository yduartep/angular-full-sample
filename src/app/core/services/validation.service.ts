import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/concat';

import {CommonUtil} from '../utilities/common.util';
import {Map} from '../utilities/data-structure';

@Injectable()
export class ValidationService {
  private _elements: Map<any> = new Map<any>();

  constructor() {
  }

  /**
   * Register an ui element
   * @param element the ui element
   */
  subscribe(element: any) {
    if (element) {
      this._elements.add(element.id, element);
    }
  }

  /**
   * Un-register an ui element
   * @param element the ui element
   */
  unsubscribe(element: any) {
    if (element) {
      this._elements.remove(element.id);
    }
  }

  /**
   * Validate the ui element and return true if is invalid
   * @return {boolean} true if is invalid
   */
  invalid(): boolean {
    let result = false;
    Observable.concat(this._elements.asArray()
      .map(element => element.invalid))
      .subscribe(element => element.subscribe(valid => result = result || valid));
    return result;
  }

  /**
   * Returns the list of failure messages
   * @return {Array} the list of error messages
   */
  failures(): Array<string> {
    let result = [];
    Observable.concat(this._elements.asArray()
      .map(element => element.failures))
      .subscribe(element => element.subscribe(failure => {
        if (!CommonUtil.isEmpty(failure)) {
          result = result.concat(failure);
        }
      }));
    return result;
  }
}
