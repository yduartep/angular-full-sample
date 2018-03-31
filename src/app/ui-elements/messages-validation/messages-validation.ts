import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-messages-validation',
  templateUrl: './messages-validation.html',
  styleUrls: ['./messages-validation.scss'],
})
export class MessagesValidationComponent {
  @Input() messages: Array<string>;
}
