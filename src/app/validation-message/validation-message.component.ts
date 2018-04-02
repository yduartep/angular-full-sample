import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormGroup, NgForm} from '@angular/forms';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent implements OnInit {
  @Input() control: AbstractControl;
  @Input() error = '';
  @Input() type = '';

  isInvalid() {
    if (!this.type) {
      return this.control.invalid && this.control.touched;
    }
    return this.control.hasError(this.type) && this.control.touched;
  }

  ngOnInit() {
    if (!this.error) {
      this.error = this.getDefaultMessage();
    }
  }

  /**
   * Get default message error
   * @returns {string} the default message
   */
  getDefaultMessage() {
    if (!this.type) {
      return 'Generic Validation Error';
    }
    // return default messages
    switch (this.type) {
      case 'required':
        return 'This field is mandatory';
      case 'pattern':
        return 'Value does not match required pattern';
      case 'minlength':
        return 'Value must be N characters';
      case 'maxlength':
        return 'Value must be a maximum of N characters';
      default:
        return `Validation failed: ${this.type}`;
    }
  }
}
