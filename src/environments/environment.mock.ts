// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  envName: 'mock',
  apiConfig: {
    apiEnv: 'mock',
    timeExpired: 20,
    credentials: {
      clientId: 'trustedclient',
      clientSecret: 'trustedclient123'
    },
    apiUrls: [
      { id: 'HEROES_SERVICE_URL', url: 'http://127.0.0.1:3000/api/heroes' },
      { id: 'VILLAINS_SERVICE_URL', url: 'http://127.0.0.1:3000/api/villains' },
      { id: 'AUTH_SERVICE_URL', url: 'http://127.0.0.1:3000/api/oauth/token' }
    ],
  }
};
