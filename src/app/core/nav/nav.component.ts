import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Menu } from './menu';
import { Language } from './language';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input()
  items: Menu[];

  @Input()
  languages: Language[];

  ngOnInit() { }

  constructor(private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }


  onLanguageChange(language) {
    console.log('Language changed to: ' + language);
    this.translate.use(language);

  }
}
