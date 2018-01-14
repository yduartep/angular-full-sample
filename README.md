![Build Status](https://travis-ci.org/yduartep/angular-full-sample.svg?branch=master)

# Getting Started

Full sample application built with Angular 4 that follows all steps of [Angular Style Guide](https://angular.io/guide/styleguide). Include:
- **Lazy loading** of modules.
- **Ngrx** integration using store / effects / selectors.
- Use of **Service Worker** on production environment for HTTP caching.
- keeping track of *ngFor* using the **trackBy** property in all list.
- **Api rest configurations** by environment.
- Integrated with [ngx-translate](http://www.ngx-translate.com/) module.
- Backend mocked with [json-server](https://github.com/typicode/json-server) and [faker.js](https://github.com/marak/Faker.js/). 
- **Bootstrap** and **Font-awsone** integration including  [ngx-bootstrap](https://valor-software.com/ngx-bootstrap/#/) library.
- **Http interceptor** system that dinamically add info into request header, check authentication before call and display/hide spinner before/after rest call.
- Configurable **Login component** implementing multiple authentication client like **OAuth**.
- **Guards** for check authentication and singleton module loading.
- Custom **UI and Form validations** with **control messages**.
- Customizable **Logger systems** and **Error handlers**.
- Definition of **Cache** services.
- [typicode/hotel](https://github.com/typicode/hotel) integration for manage processes.
- Visualization of **Modal dialog** and **Alerts** through services.
- **Search component** provided using **RxJs**.
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

# Summary

- [Get the Code](#get-the-code)
  - [Just in Time (JiT) Compilation](#just-in-time-jit-compilation)
  - [Ahead of Time (AoT) Compilation](#ahead-of-time-aot-compilation)
- [Functionalities](#functionalities)
  - [1. How create new lazy module](#1-how-create-new-lazy-module)
  - [2. How create new api config environment](#2-how-create-new-api-config-environment)
  - [3. How translate elements in a page](#3-how-translate-elements-in-a-page)
    - [i. Language initialization](#i-language-initialization)
    - [ii. Word translations](#ii-word-translations)
    - [iii. How to use the language selector](#iii-how-to-use-the-language-selector)
    - [iv. How to define new language](#iv-how-to-define-new-language)
  - [4. How to mock services](#4-how-to-mock-services)
  - [5. Bootstrap and Font-awsone integration](#5-bootstrap-and-font-awsone-integration)
  - [6. Dynamic nav bar](#6-dynamic-nav-bar)
  - [7. Http interceptor system](#7-http-interceptor-system)
  - [8. Login component configurable with different authentication service](#8-login-component-configurable-with-different-authentication-service)
    - [How to create new Authentication service](#how-to-create-new-authentication-service)
  - [9. Guards](#9-guards)
  - [10. Custom service validation and control messages](#10-custom-service-validation-and-control-messages)
    - [How to create new ui component:](#how-to-create-new-ui-component)
  - [11. Customizable logger system](#11-customizable-logger-system)
    - [How to create a new Logger system:](#how-to-create-a-new-logger-system)
  - [12. Incorporated automatic handle errors](#12-incorporated-automatic-handle-errors)
    - [How to create a new ErrorHandler:](#how-to-create-a-new-errorhandler)
  - [13. How to apply NGRX on CRUD operations of a module](#13-how-to-apply-ngrx-on-crud-operations-of-a-module)  
  - [14. Not found component](#13-not-found-component)
  - [15. TSLint integration](#14-tslint-integration)
  - [15. Unit and Functional test](#15-unit-and-functional-test)
  - [17. Cache Services](#16-cache-services)
- [Useful Commands](#useful-commands)
  - [Application execution](#application-execution)
  - [Management Console](#management-console)
  - [Build](#build)
  - [Documentation](#gocumentation)


<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Get the Code
```
git clone https://github.com/yduartep/angular-full-sample.git
cd angular-full-sample
npm i
```

## Just in Time (JiT) Compilation

Runs the TypeScript compiler and launches the app

```
npm start
```

## Ahead of Time (AoT) Compilation 

Runs the Angular AoT compiler, rollup, uglify for an optimized bundle, then launches the app

```
ng build --aot
```

# Functionalities

## 1. How create new lazy module
1. Install agular-cli globally: `npm install -g @angular/cli`
2. Create new module from the root of the app using command: `ng g module heroes`
3. Create new routing module in the folder of the module created before: `ng g module heroes/heroes-routing`
   - Define the routes and import them into the module as child routes: 
      ```
      export const heroesRoutes: Routes = <Routes>[{
        path: '',
        component: HeroesComponent,
        children: [
          { path: '', component: HeroListComponent },
          { path: 'detail/:id', component: HeroDetailComponent },
          { path: 'create', component: HeroCreateComponent }
        ]
      }];
      @NgModule({
        imports: [RouterModule.forChild(heroesRoutes)],
        exports: [RouterModule]
      })
      ```
   - Export the module `export class HeroesRoutingModule {}`
   - Export the list of components used `export const heroesRoutedComponents = [ MyComponent, ...];`.
4. Import the routing module and the routed components in the first module created:
   ```
   @NgModule({
      imports: [HeroesRoutingModule, ...],
      declarations: [heroesRoutedComponents]
   })
   export class HeroesModule { }
   ```
5. Add the new route /heroes to the list of menus defined in the file /assets/data/menu.data
   ```
   [{ "title": "Heroes", "action": "/heroes", "icon": "fa-flash"}, ... ]
   ```
6. Add the new route /heroes to the main routes defined in app-routing.module:
   ```
   const routes: Routes = [..., {path: 'heroes', loadChildren: 'app/heroes/heroes.module#HeroesModule', canActivate: [AuthGuard]},...];
   ```
More Info: https://angular-2-training-book.rangle.io/handout/modules/lazy-loading-module.html

## 2. How create new api config environment
1. Go to the folder environments and create a new file configuration: `environment.qa.ts`
2. Define the configuration to be used in this new environment:
   ```
   export const environment = {
      appName: 'My Demo Application',
      production: false,
      envName: 'qa',
      buildVersion: '1.0.0-SNAPSHOT',
      buildTimestamp: new Date().toISOString(),
      defaultLanguage: 'en',
      apiConfig: {
        apiEnv: 'dev',
        timeExpired: 1200,
        credentials: {
          clientId: 'userClientId',
          clientSecret: 'pwdClient'
        },
        apiUrls: [
          {id: 'HEROES_SERVICE_URL', url: 'http://127.0.0.1:3000/api/heroes', requireAuthBefore: true},
          ...
          {id: 'OAUTH_SERVICE_URL', url: 'http://127.0.0.1:3000/api/oauth/token', requireAuthBefore: false}
        ],
        authService: AuthTypes.OAUTH,
        authScheme: AuthScheme.BEARER,
        errorHandler: ErrorHandlerTypes.SIMPLE,
        loggerService: LoggerTypes.CONSOLE,
      }
   };
   ```
   Note: If you want to use the OAuth Client during authentication, the ID of the url should be OAUTH_SERVICE_URL. Also, if your services use the basic authentication, define the property credentials like in the example below.There are other authentication scheme that can be used like BASIC, DIGEST, HOBA or AWS depending of the authentication system you need to integrate.
   
3. Edit the file .angular-cli.json, go to the environments property and add the new configuration:
   ```
   {
      "apps": [
         "environments": {
            ...,
            "qa": "environments/environment.qa.ts"
         }
      ]
   }
   ```
4. Serve the application using the new environment: `ng serve --environment=qa`

More Info: http://tattoocoder.com/angular-cli-using-the-environment-option/

## 3. How translate elements in a page
The application use the module **ngx-translate** for translation. The configuration of the TranslateModule is defined in the app.module.ts and exported from the SharedModule, so always be sure the module who expose the component to be translated import the SharedModule. The json files used during translation are stored in the folder /assets/i18n/ with the code of the specific language of translation (es. es.json, en.json, it.json ...).
   ```
   // app.translate.factory.ts - custom TranslateLoader while using AoT compilation
   export function createTranslateLoader(http: HttpClient) {
     return new TranslateHttpLoader(http, './assets/i18n/', '.json');
   }
   
   // app.module.ts
   @NgModule({
    imports: [..., 
          TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: createTranslateLoader,
              deps: [HttpClient]
            }
        })
     ], ...
   })
   export class AppModule { }
   
   // shared/shared.module
   @NgModule({
      imports: [..., TranslateModule, ...],
      exports: [..., TranslateModule, ...]
   })
   export class SharedModule { }
   
   // heroes/heroes.module
   @NgModule({ imports: [SharedModule, ...] })
    export class HeroesModule { }
   ```
### i. Language initialization
When the app.component is instantiated set the following translation settings:
- Set the language to be used as a fallback when a translation isn't found in the current language based on the property '**defaultLanguage**' defined in the current environment: `translate.setDefaultLang(defaultLanguage);`.
- Set the language to use, if the lang isn't available. First take the language defined in the localStorage and if no value was defined will use the default language defined before: `translate.use(localStorage['language'] || defaultLanguage);`

### ii. Word translations
Now to translate our words in the HTML view:
1. Create a pipe that we can use to translate our words: `<h2>{{ 'heroesList' | translate }}</h2>`
2. Add the translation ID used in our [language].json files:
   ```
   // assets/i18n/en.json
   { ..., "heroesList": "List of Super heroes", ...}
   
   // assets/i18n/es.json
   { ..., "heroesList": "Lista de Super heroes", ...}
   ```
3. Each time you change the language, that title will change.

### iii. How to use the language selector
In the core module, there is a **language-selector** component that could be displayed anywhere to select the language for translation. On this sample application, was added in the header component.

The **language-selector** component could be initialized in two ways:
1. With a list of custom languages: `<app-language-selector [languages]="languages"></app-language-selector>`
2. Without any predefined language: `<app-language-selector></app-language-selector>`

In the second case, the languages will loaded from the file 'assets/data/languages.json'. The format of a language is:
```
{
    "id": "en",
    "title": "English",    
    "icon": "en-EN.png"
}
```
The icon should be stored in the 'assets/images/flags' folder to be displayed correctly in the component.

![Demo app translation](https://github.com/yduartep/angular-full-sample/blob/master/documentation/translate-demo.gif)

### iv. How to define new language
1. Add new json file in the folder 'assets/i18n' and copy the content from other json file already defined. Example: `assets/i18n/fr.json`
2. Translate all the properties of the new file 'fr.json'.
3. Add new entry in the json file 'assets/data/languages.json':
   ```
   {
        "id": "fr",
        "title": "French",
        "icon": "fr-FR.png"
   }
   ```
4. Download and store the flag icon for French in the folder 'assets/images/flags'.
5. Restart the application

More Info: https://github.com/ngx-translate/core/blob/master/README.md

## 4. How to mock services
1. Go to the prototype folder out of the app and define the list of elements for the new api request (/heroes) in the file 'prototype/apiMocks.js'. You can also use the faker.js module to generate massive amounts of fake data:

   ```
   module.exports = function () {
    var faker = require("faker");
    return {
      heroes: [...]
    }
   }
   ```
2. If the path of the request is different as the default (default: http://localhost:3000/token, expected: http://localhost:3000/oauth/token), redefine the route in the file routes.json:
   ```
   { ..., "/oauth/token": "/token", ... }
   ```
3. Start the mock server using the command: `npm run server:mocks`
4. Start the application using the 'mock' environment: `npm run client:mocks`

More Info:
- https://github.com/typicode/json-server
- https://scotch.io/tutorials/json-server-as-a-fake-rest-api-in-frontend-development
- https://github.com/marak/Faker.js/

## 5. Bootstrap and Font-awsone integration
The application has already installed the library 'font-awesome' and 'bootstrap', so you can create new responsive components with a pack of pre-defined icons. The application also incorporate the library 'ngx-bootstrap' that contains many modules like accordion, alerts, datepicker, progressbar, etc, that could be imported separately in the case you need it. See how to use it from http://valor-software.com/ngx-bootstrap/#/.

## 6. Dynamic nav bar
The application contains a 'nav' component in the core module that could be initialized in two ways:
1. With a list of custom menu items: `<app-nav [items]="menuData"></app-nav>`
2. Without any predefined menu: `<app-nav></app-nav>`

In the second case, the menus will loaded from the file 'assets/data/menu.json'. The format of a menu is:
```
{
    "title": "Heroes",
    "action": "/heroes",
    "icon": "fa-flash"
}
```
The icon is a font-awsone icon. See some example from http://fontawesome.io/examples/.

## 7. Http interceptor system
From the Angular 4.3 version the new **HttpClientModule** has been introduced as a complete re-implementation of the former HttpModule. The new **HttpClient** service is included to initiate HTTP request and process responses within your application and the **HttpInterceptor** to intercept an outgoing `HttpRequest`.
So, in the project I have include two new http interceptors **AuthInterceptor** and **TokenInterceptor** to check authentication,  add authorization token into the header of the request and display / hide spinner before and after complete each request.
The classes are defined as providers of the shared module, in that way, can be imported for each new module automatically. 

```
@NgModule({
providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class SharedModule {}
```

More Info:
- https://blog.slinto.sk/angular-2-http-interceptors-7e2d74b7f14e
- https://scotch.io/@kashyapmukkamala/using-http-interceptor-with-angular2

## 8. Login component configurable with different authentication service
The application include a login component that could be integrated with any authentication service that implements the interface AuthService present in the core module. The application already includes:

- OAuth Service client to be integrated with an OAuth2 server (/core/services/oauth.service.ts).
- Skyp Service that allow to display the application without to use the login component (/core/services/skyp-auth.service.ts).

### How to create new Authentication service
1. Create new class that implement the interface AuthService. The BaseAuthService is an abstract class that contains some util functionalities like adding or removing user and token info from and to the cookie.

    ```
    @Injectable()
    export class LDAPService extends BaseAuthService implements AuthService {...}
    ```
 2. Go to the authFactory function defined in the core module in '/core/factories/auth.factory.ts' and replace the instance created using the new class:
 
    ```
    export function authFactory(http: Http): AuthService {
      return new LDAPService(...);
    }
    ```
 3. Restart the application
 
## 9. Guards
The application have implemented multiple guards (auth, login, module-import) to protect routes and module loading. All the guards are registered using providers in the 'Core' module. 

- **auth.guard**: Is used to check if the user was already logged before to continue or redirect him to the login page if a Login system is enable. Note: If you are using the SkypAuthentication service, no login is enable so you always will be able to continue without to be redirected to the login page.
- **login.guard**: Is used to check if the user wants to go to the login page after he was logged in the application. In that case will be redirected to the home page (/).
- **module-import.guard**: This is another kind of guard that check that the 'Core' module is imported just one time in all the application otherwise will rise an error.

More Info:
- https://angular.io/docs/ts/latest/guide/router.html#!#guards
- https://blog.thoughtram.io/angular/2016/07/18/guards-in-angular-2.html
 
## 10. Custom service validation and control messages
There is a new module '**ui-elements**' that contains a list of basic ui components (like input text, password text, number picker, datepicker, select...) with validation support. This '**ui-elements**' module is imported and exported in the SharedModule with the objective of use it from all parts of the application. The project provide a list of predefined directives that are used to validates the ui elements (`dateValidator, emailValidator, hexadecimal, maxDateToday, numeric and passwordValidator`). Also the directives already defined by angular like `required, minLength or maxLength` can be used.

### How to create new ui component
1. Create new component using angular-cli `ng g component ui-timepicker`.
2. Extends your class from UIElementBase and define the generic type that will be returned as value:
```
@Component({
  selector: 'ui-timepicker',
  templateUrl: './ui-timepicker.html',
  animations,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: UITimePickerComponent,
    multi: true,
  }]
})
export class UITimePickerComponent extends UIElementBase<string> {
  @Input() placeholder = '';

  constructor(@Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
              @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
              validationService: ValidationService) {
    super(validators, asyncValidators, validationService);
  }
}
```
3. Define the html content including the **ui-messages-validation** component to be displayed in case of error validations:
```
<div *ngIf="mode !== Mode.VIEW">
  <label class="control-label col-sm-3" [attr.for]="id">{{ title }}{{mandatoryLabel}}:</label>
  <div class="col-sm-5">
    <timepicker [(ngModel)]="value" [ngClass]="{invalid: (invalid | async)}" [id]="id"></timepicker>
  </div>
  <div class="col-sm-4">
    <ui-messages-validation
      *ngIf="invalid | async"
      [messages]="failures | async">
    </ui-messages-validation>
  </div>
</div>
<div *ngIf="mode === Mode.VIEW">
  <!-- to display the component in read only mode -->
  <ui-review [title]="title" [value]="value"></ui-review>
</div>
```
4. Include the new component in the '**ui-elements**' module:
```
@NgModule({
  ...
  declarations: [..., UITimePickerComponent],
  exports: [..., UITimePickerComponent]
})
export class UIElementsModule {}
```
5. Use the new component from any other module, include the directive validation you need and set the custom error message you want to display:
```
<form #frmName="ngForm" id="frmName" novalidate (ngSubmit)="onSubmit()" novalidate>
  <div class="row">
    <ui-timepicker  required 
                    dataErrorRequired="The time field is mandatory"
                    id="tpName"
                    title="{{'fields.time.title' | translate}}"
                    [mode]="mode"
                    [(ngModel)]="model"
                    [ngModelOptions]="{standalone: true}">
    </ui-timepicker>
  </div>
```

6. The form that include the component should extends from the class **UIFormComponent** that include the **validate()** method. If the whould form is not valid then you can't proceed:
```
@Component({...})
export class MyFormComponent extends UIFormComponent {
   constructor(..., validation: ValidationService) {
    super(validation);
  }
  onSubmit() {
     if (this.validate()) {
        // ... continue saving data
     }
  }
}
```

Note: The component will display the invalid field with a red border and all the validator will be activated when you click on the field and leave it.

![UI Validations](https://github.com/yduartep/angular-full-sample/blob/master/documentation/ui-validation.PNG)

More Info: 
- http://blog.rangle.io/angular-2-ngmodel-and-custom-form-components/
- https://angular.io/docs/ts/latest/cookbook/form-validation.html
- https://auth0.com/blog/angular2-series-forms-and-custom-validation/

## 11. Customizable logger system
The application include a '**Logger**' service in the 'Core' module that could be implemented in different ways: Using just the console or using other system like logs into a file. To enable the application to use one or other system you have to change the class to be instanciated in the factory '/core/factories/logger.factory.ts'.

### How to create a new Logger system:
1. Create a new class that implement the interface '/core/services/logger.service'.
    ```
    @Injectable()
    export class FileLoggerService implements LoggerService {
      log(msg: string) {...}
      error(msg: string) {...}
      warn(msg: string) {...}
    }
    ```
2. Go to the factory '/core/factories/logger.factory.ts' and change the class to be used during initialization:
    ```
    export function loggerFactory(): LoggerService {
        return new FileLoggerService(...);
    }
    ```
3. Restart the server

## 12. Incorporated automatic handle errors
The 'Core' module contains also a '**Simple Error Handler**' that implements the interface 'ErrorHandler' present in the package '@angular/core'. Each http call that fails, automatically will call the method handleError() of the handler. In 'Simple Error Handler' the errors are displayed in different ways depending of the HTTP status code (if is a server, authentication or request errors...).

### How to create a new ErrorHandler:
1. Create a new class that implement the angular interface 'ErrorHandler'.

    ```
    import { Injectable, Injector, ErrorHandler } from '@angular/core';
    @Injectable()
    export class CustomErrorHandler implements ErrorHandler {...}
    ```
    
2. Go to the factory '/core/factories/error-handler.factory.ts' and change the class to be used during initialization:
    ```
    export function errorHandlerFactory(): ErrorHandler {
        return new CustomErrorHandler(...);
    }
    ```
3. Restart the server

More Info: https://netbasal.com/angular-2-custom-exception-handler-1bcbc45c3230

## 13. How to apply NGRX on CRUD operations of a module
- Each module have a folder **store** where will be saved the **actions** (heroes.actions.ts), **effects** (heroes.effects.ts) and **reducers** (heroes.reducers.ts).

- In the module class (heroes.module.ts) are imported the reducers to be called by each feature using the class **StoreModule** and also the **EffectsModule**.

```
export const reducers: ActionReducerMap<any> = {
  heroes: heroReducer.reducer
};

@NgModule({
  imports: [
    ...
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([HeroEffects])
  ],...
})
export class HeroesModule {}
```

- In the main component of the specific module (*heroes.component.ts*), I have centralized all the actions to be executed when a CRUD operation has successfully finish or the error thrown using a subscription to the specific select defined in the reducer:

```
this.store.select(isDeleted).subscribe((deleted) => {
    this.actionSuccess(...);
});
this.store.select(getDeleteError).subscribe((error) => {
    this.actionError(...);
});
    
```

### How to EDIT a hero using Ngrx/store & Effects:
1. To edit a hero, the system **dispatch** an event with the action **"UPDATE_HERO"**.
2. The **reducer** related to the module **heroes** is executed and the state is changed updating the information of specific hero.
3. An **“ngrx effect”** class is implemented (HeroEffects) by module and will be triggered when we dispatch actions with the store.
4. Using some selectors defined in my **reducer** class, we can monitor the success of each action and exceute some specific code after that (like display a success message and/or come back to the home page).

See next diagram:

![Flow Diagram](https://github.com/yduartep/angular-full-sample/blob/IT1/ngrx_integration/documentation/diagram-ngrx.png)

## 14. Not found component
The application include a 'Not-Found' component inside the 'Shared' module that will be displayed in the case the user type an invalid route in the browser.

## 15. TSLint integration
To check if the application have quality errors execute the following command:

```
npm run lint
```

More Info: http://blog.rangle.io/understanding-the-real-advantages-of-using-eslint/

## 16. Unit and Functional test
The project have some predefined unit tests defined in the files '.spec' related of each service and component and the functional test should be implemented in the 'e2e' folder outside of the app.

- To run then unit tests execute the command:
```
npm run test
```

- To run then functional tests execute the command:
```
npm run e2e
```

More Info:
- https://angular.io/docs/ts/latest/guide/testing.html
- https://blog.jscrambler.com/getting-started-with-angular-2-end-to-end-testing/

## 17. Cache Services
The application include a '**Cache Service**' defined in `/core/services/cached.service.ts` that fetch information just the first time and the rest of the time return the cached information. If I want to define a service that cache the information returned, just extends your service from the 'CacheService' class:

```
@Injectable()
export class EditorialService extends CachedService<Editorial> {
  constructor(protected http: Http, @Inject('api.config') protected apiConfig: ApiConfig) {
    super(http, apiConfig);
  }
  public getServiceUrl(): string {
    return CommonUtil.getApiUrl('EDITORIAL_SERVICE_URL', this.apiConfig);
  }
}
```

More Info:
- https://hackernoon.com/angular-simple-in-memory-cache-service-on-the-ui-with-rxjs-77f167387e39

# Useful Commands
## Application execution
- **npm start**: starts the application and the mock server concurrently logging the information in the console and in the generated files application.log and mockserver.log. Finnaly open the application into the browser in the address http://localhost:4200.

![Start concurrently](https://github.com/yduartep/angular-full-sample/blob/master/documentation/start-concurrently.PNG)

- **npm run start:mocks**: starts the mock server.
- **npm run start:application**: starts the application and opens a browser.

## Management Console
- **npm run management:console:start**: starts the management console which is accessible from http://server:2000
![Hotel Integration](https://github.com/yduartep/angular-full-sample/blob/master/documentation/hotel%20integration.PNG)

- **npm run management:console:stop**: sopts the management console

## Build
- **npm run build:prod**: builds the application for production environment.

## Documentation
- **npm run documentation:gentoc**: generates the table of contents of the README.md file.
