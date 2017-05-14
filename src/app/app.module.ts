import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { XHRBackend, Http, RequestOptions } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

// translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { createTranslateLoader } from './app.translate.factory';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

// modules
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

// components
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';

// services
import { SpinnerService } from './core/spinner/spinner.service';

// factories and configurations
import { environment } from '../environments/environment';
import { COOKIE_IDENTIFIERS } from './cookie.identifiers';

import { httpFactory } from './shared/http.factory';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
    // TODO InMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 600 })
  ],
  declarations: [
    AppComponent,
    AboutComponent
  ],
  providers: [
    { provide: 'api.config', useValue: environment.apiConfig },
    { provide: 'defaultLanguage', useValue: environment.defaultLanguage }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
