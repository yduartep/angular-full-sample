import {ApiUrl} from './api-url';
import {Credentials} from './credentials';
import {AuthScheme} from './auth-scheme.enum';

export class ApiConfig {
  apiEnv: string;
  apiUrls: ApiUrl[] = [];
  timeExpired: number;
  credentials: Credentials;
  authService: string;
  authScheme: AuthScheme;
  errorHandler: string;
  loggerService: string;
}
