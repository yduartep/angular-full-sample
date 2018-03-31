import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

// translate
import {createTranslateLoader} from './app.translate.factory';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// modules
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';
import {AppRoutingModule} from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';

// components
import {AppComponent} from './app.component';

// services
import {MessageService} from './modal-message/message.service';

// factories and configurations
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('./ngsw-worker.js', {enabled: environment.production})
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
