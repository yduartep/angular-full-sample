# Getting Started

Full sample application built with Angular 4 that follows all best practices. This app contains:

1. Application of Lazy Loading Modules.
2. Api configurations by environments ("dev", "prod" or "mock").
3. Integration with translation module.
4. Mock system defined with "json-server" and "faker.js" library.
5. Bootstrap and Font-awsone integration.
6. Dynamic nav bar definition.
7. Http interceptor system.
8. Login component configurable with different authentication service implementation.
9. Custom service validation already available (es. creditCardValidator, emailValidator, passwordValidator ...).
10. Customizable logger system.
11. TSLint integration for quality.
12. Unit and Functional test with Jasmine, Karma and Protractor.

## Core Module
1. Spinner component to be displayed before to load any resource and hidden at the end.
2. Base "Header" and "Footer" component to be overriden.
3. Include a nav customizable bar with language selector that allow the creation of multi-language apps.
4. Automatic handle errors to display different messages and formats depending of the error type.
5. Http Interceptor system to configure extra things on each http call.
6. Multiple guards (auth, login, module-import) to protect routes and module loading.
7. Custom authentication service implementation. Include an "Oauth2 client" service to integrate your login page with OAuth 2.0 service and other service (SkypAuthService) to by pass the login automatically and redirect to the home page.
8. Validation service included to define new custom validations to be used in any form validation (es. creditCardValidator, emailValidator, passwordValidator ...).
9. Include logger customizable service in the core module to logs anything in the app.

## Shared Module:
1. Control message component created in the shared module to display custom messages in input controls depending of the validators and messages configured.
2. Login component displayed depending of the authentication service configured.
3. Not found component displayed when invalid routes.

## Get the Code
```
git clone https://github.com/yduartep/angular-full-sample.git
cd angular-full-sample
npm i
```

### Just in Time (JiT) Compilation

Runs the TypeScript compiler and launches the app

```
npm start
```

### Ahead of Time (AoT) Compilation 

Runs the Angular AoT compiler, rollup, uglify for an optimized bundle, then launches the app

```
npm run start-aot
```

### AoT + gzip 

Runs AoT plus gzips and launches the app 

```
gulp copy-aot-gzip
npm run aot
npm run rollup
http-server
```

Notes:
- Use your favorite server in place of `http-server`
- This could be scripted, obviously
- `lite-server` does not launch gzipped files by default.


