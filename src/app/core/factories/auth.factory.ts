import { Http } from '@angular/http';

// models
import { ApiConfig } from '../models/api-config';

// services
import { AuthService } from '../services/auth.service';
import { AuthHelper } from '../services/auth.helper';
import { SkypAuthService } from '../services/skyp-auth.service';
import { OAuthService } from '../services/oauth.service';

// configurations
import { AuthTypes } from './auth.type';
import { environment } from '../../../environments/environment';
import { COOKIE_IDENTIFIERS } from '../../cookie.identifiers';

export function authFactory(http: Http): AuthService {
    switch (environment.apiConfig.authService) {
        case AuthTypes.OAUTH:
            return new OAuthService(http, environment.apiConfig);
        case AuthTypes.SKYP:
            return new SkypAuthService();
        default:
            return new SkypAuthService();
    }
}
