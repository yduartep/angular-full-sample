import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Http, RequestOptions, XHRBackend} from '@angular/http';

// modules
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {ModalModule, AlertModule, BsDatepickerModule} from 'ngx-bootstrap';

// components
import {LoginComponent} from './login/login.component';
import {PageNotFoundComponent} from './not-found/not-found.component';

// factories
import {httpFactory} from './http.factory';

// services
import {SpinnerService} from '../core/spinner/spinner.service';
import {AuthHelper} from '../core/services/auth.helper';
import {ModalMessageComponent} from '../modal-message/modal-message.component';
import {UIElementsModule} from '../ui-elements/ui-elements.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    UIElementsModule,
  ],
  declarations: [
    // FocusDirective,
    LoginComponent,
    PageNotFoundComponent,
    ModalMessageComponent,
  ],
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, SpinnerService, AuthHelper]
    }
  ],
  exports: [
    CommonModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    ModalModule,
    AlertModule,
    BsDatepickerModule,
    UIElementsModule,

    // FocusDirective,
    LoginComponent,
    PageNotFoundComponent,
    ModalMessageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
}
