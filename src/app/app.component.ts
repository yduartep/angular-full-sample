import {Component, Inject} from '@angular/core';
import {AuthHelper} from './core/services/auth.helper';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(@Inject('defaultLanguage') private defaultLanguage: string,
              private authHelper: AuthHelper,
              private translate: TranslateService) {

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(defaultLanguage);

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(localStorage['language'] || defaultLanguage);
  }

  isActive(): boolean {
    return this.authHelper.isUserLogged();
  }
}
