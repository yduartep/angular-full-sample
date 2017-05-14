import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap';

// components
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './not-found/not-found.component';
import { ControlMessagesComponent } from './control-messages/control-messages.component';
import { ModalAlertComponent } from './modal-alert/modal-alert.component';

// factories
import { httpFactory } from './http.factory';

// services
import { SpinnerService } from '../core/spinner/spinner.service';

// environments
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ModalModule.forRoot(),
    TranslateModule
  ],
  declarations: [
    LoginComponent,
    PageNotFoundComponent,
    ControlMessagesComponent,
    ModalAlertComponent
  ],
  providers: [
    { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions, SpinnerService] }
  ],
  exports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    ModalModule,

    LoginComponent,
    PageNotFoundComponent,
    ControlMessagesComponent,
    ModalAlertComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
