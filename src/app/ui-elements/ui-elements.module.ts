import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AlertModule} from 'ngx-bootstrap';

// components
import {MessagesValidationComponent} from './messages-validation/messages-validation';
import {UIInputComponent} from './ui-input/ui-input';
import {UISelectComponent} from './ui-select/ui-select';
import {UIReviewComponent} from './ui-review/ui-review';
import {UINumberPickerComponent} from './ui-number-picker/ui-number-picker';
import {UIDatePickerComponent} from './ui-datepicker/ui-datepicker.component';
import {UIDayCalendarComponent} from './ui-datepicker/day-calendar/day-calendar.component';
import {UIPasswordComponent} from './ui-password/ui-password';

// directives
import {HexadecimalValidatorDirective} from './directives/hexadecimal.directive';
import {NumericValidatorDirective} from './directives/numeric.directive';
import {DateValidatorDirective} from './directives/date.directive';
import {EmailValidatorDirective} from './directives/email.directive';
import {MaxDateTodayValidatorDirective} from './directives/maxDateToday.directive';
import {PasswordValidatorDirective} from './directives/password-valid.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot()
  ],
  declarations: [
    UIInputComponent,
    UINumberPickerComponent,
    UISelectComponent,
    UIReviewComponent,
    UIDatePickerComponent,
    UIDayCalendarComponent,
    UIPasswordComponent,
    MessagesValidationComponent,
    HexadecimalValidatorDirective,
    NumericValidatorDirective,
    DateValidatorDirective,
    EmailValidatorDirective,
    MaxDateTodayValidatorDirective,
    PasswordValidatorDirective
  ],
  providers: [],
  exports: [
    UIInputComponent,
    UISelectComponent,
    UINumberPickerComponent,
    UIReviewComponent,
    UIDatePickerComponent,
    UIPasswordComponent,
    MessagesValidationComponent,
    HexadecimalValidatorDirective,
    NumericValidatorDirective,
    DateValidatorDirective,
    EmailValidatorDirective,
    MaxDateTodayValidatorDirective,
    PasswordValidatorDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UIElementsModule {
}
