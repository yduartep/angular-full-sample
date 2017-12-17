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
import {UIElementsModule} from '../ui-elements/ui-elements.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './token.interceptor';
import {AuthInterceptor} from './auth.interceptor';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

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
    UIElementsModule,
    StoreModule,
    EffectsModule
  ],
  declarations: [
    // FocusDirective,
    LoginComponent,
    PageNotFoundComponent,
    ModalMessageComponent,
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
    StoreModule,
    EffectsModule,

    // FocusDirective,
    LoginComponent,
    PageNotFoundComponent,
    ModalMessageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
}
