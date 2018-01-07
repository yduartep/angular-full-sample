import {NgModule, Optional, SkipSelf, ErrorHandler} from '@angular/core';

// modules
import {SharedModule} from '../shared/shared.module';

// guards
import {throwIfAlreadyLoaded} from './guards/module-import.guard';
import {AuthGuard} from './guards/auth.guard';
import {LoginGuard} from './guards/login.guard';

// components
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {NavComponent} from './nav/nav.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {AboutComponent} from './about/about.component';
import {LanguageSelectorComponent} from './language-selector/language-selector.component';
import {AlertComponent} from './alert/alert.component';

// services
import {BroadcasterService} from './services/broadcaster.service';
import {AuthService} from './services/auth.service';
import {AuthHelper} from './services/auth.helper';
import {OAuthService} from './services/oauth.service';
import {SkypAuthService} from './services/skyp-auth.service';
import {LoggerService} from './services/logger.service';
import {SpinnerService} from './spinner/spinner.service';
import {JsonFileService} from './services/json-file.service';
import {ValidationService} from './services/validation.service';
import {AlertService} from './alert/alert.service';
import {EditorialService} from './services/editorial.service';

// factories
import {authFactory} from './factories/auth.factory';
import {loggerFactory} from './factories/logger.factory';
import {errorHandlerFactory} from './factories/error-handler.factory';
import {HttpClient} from '@angular/common/http';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    AlertComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    SpinnerComponent,
    LanguageSelectorComponent,
    AboutComponent
  ],
  declarations: [
    AlertComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    SpinnerComponent,
    LanguageSelectorComponent,
    AboutComponent
  ],
  providers: [
    AlertService,
    OAuthService,
    SkypAuthService,
    SpinnerService,
    JsonFileService,
    AuthGuard,
    LoginGuard,
    AuthHelper,
    {provide: ErrorHandler, useFactory: errorHandlerFactory},
    {provide: 'AuthService', useFactory: authFactory, deps: [HttpClient, AuthHelper]},
    {provide: 'LoggerService', useFactory: loggerFactory},
    BroadcasterService,
    ValidationService,
    EditorialService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
