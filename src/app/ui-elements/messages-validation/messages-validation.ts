import { Component, Input } from '@angular/core';

@Component({
  selector: 'messages-validation',
  templateUrl: './messages-validation.html',
  styleUrls: ['./messages-validation.css'],
})
export class MessagesValidationComponent {
  @Input() messages: Array<string>;
}
