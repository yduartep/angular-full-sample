export const environment = {
  production: true,
  envName: 'prod',
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
      { id: 'AUTH_SERVICE_URL', url: 'http://127.0.0.1:9001/api/oauth/token' }
    ],
  }
};
