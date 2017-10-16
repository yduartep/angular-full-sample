import {ValidationService} from '../core/services/validation.service';

export abstract class UIFormComponent {
  constructor(protected validation: ValidationService) {
  }

  /**
   * Determine if the entire form is valid or not and put the focus on the first invalid element
   * @returns {boolean} true if all the elements in the form are valid otherwise false
   */
  public validate(): boolean {
    if (this.validation) {
      return !this.validation.invalid();
    }
  }

  /**
   * Get all the error messages from the elements in the form
   * @returns {Array<string>} all failures in the form
   */
  public failures(): Array<string> {
    if (this.validation) {
      return this.validation.failures();
    }
  }
}
