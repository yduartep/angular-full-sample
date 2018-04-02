// modules
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {ModalModule, AlertModule, BsDatepickerModule} from 'ngx-bootstrap';

// components
import {LoginComponent} from './login/login.component';
import {PageNotFoundComponent} from './not-found/not-found.component';

// services
import {ModalMessageComponent} from '../modal-message/modal-message.component';
import {ValidationMessageComponent} from '../validation-message/validation-message.component';
import {UIElementsModule} from '../ui-elements/ui-elements.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './token.interceptor';
import {AuthInterceptor} from './auth.interceptor';
import {DescriptionPipe} from './description.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    UIElementsModule
  ],
  declarations: [
    LoginComponent,
    PageNotFoundComponent,
    ModalMessageComponent,
    ValidationMessageComponent,
    DescriptionPipe
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    ModalModule,
    AlertModule,
    BsDatepickerModule,
    UIElementsModule,
    LoginComponent,
    PageNotFoundComponent,
    ModalMessageComponent,
    ValidationMessageComponent,
    DescriptionPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
}
