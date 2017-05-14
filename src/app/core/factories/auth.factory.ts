import { Http } from '@angular/http';

// services
import { AuthService } from '../services/auth.service';
import { SkypAuthService } from '../services/skyp-auth.service';
import { OAuthService } from '../services/oauth.service';

// configurations
import { environment } from '../../../environments/environment';
import { COOKIE_IDENTIFIERS } from '../../cookie.identifiers';

export function authFactory(http: Http): AuthService {
    return new OAuthService(http, environment.apiConfig, COOKIE_IDENTIFIERS.USER_ID, COOKIE_IDENTIFIERS.TOKEN_ID);
}