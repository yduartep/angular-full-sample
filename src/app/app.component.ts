import {Component, Inject} from '@angular/core';
import {AuthHelper} from './core/services/auth.helper';
import {TranslateService} from '@ngx-translate/core';
import {SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(@Inject('defaultLanguage') private defaultLanguage: string,
              private authHelper: AuthHelper,
              private translate: TranslateService,
              private swUpdate: SwUpdate) {

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(defaultLanguage);

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(localStorage['language'] || defaultLanguage);

    console.log('Initializing the app component ...');
    if (this.swUpdate.isEnabled) {

      this.swUpdate.checkForUpdate();
      this.swUpdate.available.subscribe(event => {
        console.log('A newer version is now available. Refresh the page now to update the cache');
        window.location.reload();
      });
    }
  }

  isActive(): boolean {
    return this.authHelper.isUserLogged();
  }
}
