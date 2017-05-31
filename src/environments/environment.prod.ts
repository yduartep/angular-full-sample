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
      { id: 'PROCESS_SERVICE_URL', url: 'app/process' },
      { id: 'PROCESS_HISTORY_SERVICE_URL', url: 'app/history' },
      { id: 'OAUTH_SERVICE_URL', url: 'http://localhost:8080/oauth/token' }
    ],
    authService: AuthTypes.SKYP,
    errorHandler: ErrorHandlerTypes.SIMPLE,
    loggerService: LoggerTypes.CONSOLE,
  }
};
