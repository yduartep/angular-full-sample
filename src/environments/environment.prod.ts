import { AuthTypes } from '../app/core/factories/auth.type';
import { ErrorHandlerTypes } from '../app/core/factories/error-handler.type';
import { LoggerTypes } from '../app/core/factories/logger.type';

export const environment = {
  production: true,
  envName: 'prod',
  defaultLanguage: 'en',
  apiConfig: {
    apiEnv: 'prod',
    timeExpired: 20,
    credentials: {
      clientId: 'trustedclient',
      clientSecret: 'trustedclient123'
    },
    apiUrls: [
      { id: 'HEROES_SERVICE_URL', url: 'app/heroes' },
      { id: 'VILLAINS_SERVICE_URL', url: 'app/villains' },
      { id: 'OAUTH_SERVICE_URL', url: 'http://localhost:3000/api/oauth/token' }
    ],
    authService: AuthTypes.SKYP,
    errorHandler: ErrorHandlerTypes.SIMPLE,
    loggerService: LoggerTypes.CONSOLE,
  }
};
