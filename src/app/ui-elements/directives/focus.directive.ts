/**
 * Example: https://blog.thecodecampus.de/angular-2-set-focus-element/
 *  <input [focus]="myFocusTriggeringEventEmitter">
 *  <button (click)="someMethod()">Set Focus on Input</button>
 *  public myFocusTriggeringEventEmitter = new EventEmitter<boolean>();
 *  someMethod() {this.myFocusTriggeringEventEmitter.emit(true);}
 */
import {Directive, OnInit, Input, EventEmitter, ElementRef, Inject} from '@angular/core';

@Directive({
  selector: '[focus]'
})
export class FocusDirective implements OnInit {
  @Input('focus') focus: EventEmitter<boolean>;

  constructor(@Inject(ElementRef) private element: ElementRef) {
  }

  ngOnInit() {
    const that = this;
    this.focus.subscribe(event => {
      if (event) {
        setTimeout(() => {
          that.element.nativeElement.focus();
        }, 10);
      }
    });
  }
}
