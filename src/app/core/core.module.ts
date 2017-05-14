import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { Http } from '@angular/http';

// modules
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

// guards
import { throwIfAlreadyLoaded } from './guards/module-import.guard';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

// components
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';

// services
import { AuthService } from './services/auth.service';
import { AuthHelper } from './services/auth.helper';
import { OAuthService } from './services/oauth.service';
import { SkypAuthService } from './services/skyp-auth.service';
import { LoggerService } from './services/logger.service';
import { SpinnerService } from './spinner/spinner.service';
import { MenuService } from './nav/menu.service';
import { LanguageService } from './language-selector/language.service';

// factories
import { authFactory } from './factories/auth.factory';
import { loggerFactory } from './factories/logger.factory';
import { errorHandlerFactory } from './factories/error-handler.factory';

// environment
import { environment } from '../../environments/environment';
import { COOKIE_IDENTIFIERS } from '../cookie.identifiers';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [HeaderComponent, FooterComponent, NavComponent, SpinnerComponent, LanguageSelectorComponent],
  declarations: [HeaderComponent, FooterComponent, NavComponent, SpinnerComponent, LanguageSelectorComponent],
  providers: [
    SpinnerService,
    MenuService,
    LanguageService,
    AuthGuard,
    LoginGuard,
    { provide: ErrorHandler, useFactory: errorHandlerFactory },
    { provide: 'AuthService', useFactory: authFactory, deps: [Http] },
    { provide: 'LoggerService', useFactory: loggerFactory }
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
