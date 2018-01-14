// the timeExpired is expressed in seconds. By default is set to 20 minutes

import {AuthTypes} from '../app/core/factories/auth.type';
import {ErrorHandlerTypes} from '../app/core/factories/error-handler.type';
import {LoggerTypes} from '../app/core/factories/logger.type';
import {AuthScheme} from '../app/core/models/auth-scheme.enum';

const server = 'http://localhost:3000/';
export const environment = {
  appName: 'Angular Demo Application',
  production: true,
  envName: 'prod',
  buildVersion: '2.0.0',
  buildTimestamp: new Date().toISOString(),
  defaultLanguage: 'en',
  apiConfig: {
    apiEnv: 'prod',
    timeExpired: 1200,
    credentials: {
      clientId: 'trustedclient',
      clientSecret: 'trustedclient123'
    },
    apiUrls: [
      {id: 'HEROES_SERVICE_URL', url: server + 'api/heroes', requireAuthBefore: true},
      {id: 'VILLAINS_SERVICE_URL', url: server + 'api/villains', requireAuthBefore: true},
      {id: 'OAUTH_SERVICE_URL', url: server + 'api/oauth/token', requireAuthBefore: false},
      {id: 'EDITORIAL_SERVICE_URL', url: server + 'api/editorials', requireAuthBefore: true}
    ],
    authService: AuthTypes.OAUTH,
    authScheme: AuthScheme.BEARER,
    errorHandler: ErrorHandlerTypes.SIMPLE,
    loggerService: LoggerTypes.CONSOLE
  }
};
