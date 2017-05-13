import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { XHRBackend, Http, RequestOptions } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { createTranslateLoader } from './app.translate.factory';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { httpFactory } from './core/http.factory';
import { COOKIE_IDENTIFIERS } from './cookie.identifiers';
import { AboutComponent } from './about/about.component';

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
    { provide: 'cookie.user.id', useValue: COOKIE_IDENTIFIERS.USER_ID },
    { provide: 'cookie.token.id', useValue: COOKIE_IDENTIFIERS.TOKEN_ID },
    { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions] },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
