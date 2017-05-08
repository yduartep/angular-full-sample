import { NgModule, ModuleWithProviders } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Http } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { TranslateModule, TranslateLoader, TranslateService, TranslateParser } from 'ng2-translate';
// import { TranslateLoaderFactory } from '../app.translate.factory';

import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './not-found/not-found.component';
import { ControlMessagesComponent } from './control-messages/control-messages.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent, PageNotFoundComponent, ControlMessagesComponent],
  providers: [
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginComponent,
    PageNotFoundComponent,
    ControlMessagesComponent
  ]
})
export class SharedModule {
  static forRoot(configuredProviders: Array<any>): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: configuredProviders
    };
  }
}
