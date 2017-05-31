// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { AuthTypes } from '../app/core/factories/auth.type';
import { ErrorHandlerTypes } from '../app/core/factories/error-handler.type';
import { LoggerTypes } from '../app/core/factories/logger.type';

export const environment = {
  production: false,
  envName: 'dev',
  defaultLanguage: 'en',
  apiConfig: {
    apiEnv: 'dev',
    timeExpired: 20,
    credentials: {
      clientId: 'trustedclient',
      clientSecret: 'trustedclient123'
    },
    apiUrls: [
      { id: 'PROCESS_SERVICE_URL', url: 'http://localhost:8080/process' },
      { id: 'PROCESS_HISTORY_SERVICE_URL', url: 'http://localhost:8080/history' },
      { id: 'OAUTH_SERVICE_URL', url: 'http://localhost:8080/oauth/token' }
    ],
    authService: AuthTypes.SKYP,
    errorHandler: ErrorHandlerTypes.SIMPLE,
    loggerService: LoggerTypes.CONSOLE,
  }
};
