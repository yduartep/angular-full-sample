import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';

// modules
import { AppRoutingModule } from "../app-routing.module";
import { SharedModule } from '../shared/shared.module';

// guards
import { throwIfAlreadyLoaded } from './module-import.guard';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';
import { httpFactory } from './http.factory';

// helpers and handlers
import { HagueErrorHandler } from './error.handler';

// components
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { SpinnerComponent } from './spinner/spinner.component';

// services
import { AuthService } from './services/auth.service';
import { OAuthService } from './services/oauth.service';
import { SkypAuthService } from './services/skyp-auth.service';
import { LoggerService } from './services/logger.service';
import { SpinnerService } from './spinner/spinner.service';
import { environment } from '../../environments/environment';
import { COOKIE_IDENTIFIERS } from '../cookie.identifiers';

@NgModule({
  imports: [
    SharedModule, AppRoutingModule
  ],
  exports: [HeaderComponent, FooterComponent, NavComponent, SpinnerComponent],
  declarations: [HeaderComponent, FooterComponent, NavComponent, SpinnerComponent],
  providers: [
    LoggerService,
    SpinnerService,
    AuthGuard,
    LoginGuard,
    { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions] },
    { provide: ErrorHandler, useClass: HagueErrorHandler },
    { provide: 'AuthService', useClass: SkypAuthService }
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
