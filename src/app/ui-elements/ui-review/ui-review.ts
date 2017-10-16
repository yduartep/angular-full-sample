import {Component, Input} from '@angular/core';

@Component({
  selector: 'ui-review',
  templateUrl: 'ui-review.html',
})
export class UIReviewComponent {

  /**
   * The title of the field
   */
  @Input() title: string;

  /**
   * The value of the field
   */
  @Input() value: string;
}
