import { Http } from '@angular/http';

// services
import { AuthService } from '../services/auth.service';
import { AuthHelper } from '../services/auth.helper';
import { SkypAuthService } from '../services/skyp-auth.service';
import { OAuthService } from '../services/oauth.service';

// configurations
import { AuthTypes } from './auth.type';
import { environment } from '../../../environments/environment';

export function authFactory(http: Http, authHelper: AuthHelper): AuthService {
    switch (environment.apiConfig.authService) {
        case AuthTypes.OAUTH:
            return new OAuthService(http, environment.apiConfig, authHelper);
        case AuthTypes.SKYP:
            return new SkypAuthService();
        default:
            return new SkypAuthService();
    }
}
