import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

// translate
import {createTranslateLoader} from './app.translate.factory';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

// modules
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';
import {AppRoutingModule} from './app-routing.module';

// components
import {AppComponent} from './app.component';

// services
import {MessageService} from './modal-message/message.service';

// factories and configurations
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import { reducers } from './reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {provide: 'api.config', useValue: environment.apiConfig},
    {provide: 'defaultLanguage', useValue: environment.defaultLanguage},
    MessageService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
