import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '../../core/services/validation.service';

@Component({
  selector: 'app-control-messages',
  templateUrl: './control-messages.component.html',
  styles: []
})
export class ControlMessagesComponent implements OnInit {
  private _errorMessage: string;

  @Input()
  control: FormControl;

  @Input()
  message: string;

  @Input()
  validator: string;

  constructor() { }

  ngOnInit() { }

  isInvalid(): boolean {
    return this.control && this.control.touched && !this.control.valid;
  }

  hasError(validator) {
    return this.control && this.control.hasError(validator) && this.control.touched;
  }

  get errorMessage() {
    if (this.validator) {
      this._errorMessage = this.hasError(this.validator) ? this.message || ValidationService.getErrorMessage(this.validator) : null;
    } else if (this.control.errors) {
      // iterate all validators and display first error message
      for (const propertyName in this.control.errors) {
        if (this.hasError(propertyName)) {
          this._errorMessage = this.message || ValidationService.getErrorMessage(propertyName);
          break;
        }
      }
    }
    return this._errorMessage;
  }

}
