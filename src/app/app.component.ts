import {Component, Inject} from '@angular/core';
import {AuthHelper} from './core/services/auth.helper';
import {TranslateService} from '@ngx-translate/core';
import {SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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

    if (this.swUpdate.isEnabled) {

      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available. Load New Version?')) {
          window.location.reload();
        }
      });
    }
  }

  isActive(): boolean {
    return this.authHelper.isUserLogged();
  }
}
