import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateService, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { TranslateLoaderFactory } from './app.translate.factory';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';
import { COOKIE_IDENTIFIERS } from './cookie.identifiers';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 600 }),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: TranslateLoaderFactory,
      deps: [Http]
    })
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    { provide: 'api.config', useValue: environment.apiConfig },
    { provide: 'cookie.user.id', useValue: COOKIE_IDENTIFIERS.USER_ID },
    { provide: 'cookie.token.id', useValue: COOKIE_IDENTIFIERS.TOKEN_ID },
    TranslateService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
