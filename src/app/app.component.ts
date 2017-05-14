import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthHelper } from './core/services/auth.helper';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    @Inject('defaultLanguage') private defaultLanguage: string,
    private translate: TranslateService
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(defaultLanguage);

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(localStorage['language'] || defaultLanguage);
  }

  ngOnInit() {
  }

  isActive(): boolean {
    return AuthHelper.isUserLogged();
  }
}
