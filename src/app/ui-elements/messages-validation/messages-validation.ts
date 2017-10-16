import { Component, Input } from '@angular/core';

@Component({
  selector: 'messages-validation',
  templateUrl: 'messages-validation.html',
})
export class MessagesValidationComponent {
  @Input() messages: Array<string>;
}