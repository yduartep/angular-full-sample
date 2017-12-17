import {Component, OnInit, Input} from '@angular/core';
import {Language} from './language';
import {JsonFileService} from '../services/json-file.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html'
})
export class LanguageSelectorComponent implements OnInit {
  @Input()
  languages: Language[];
  languageSelected: string = localStorage['language'] || 'en';

  constructor(private jsonService: JsonFileService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    if (!this.languages || this.languages.length === 0) {
      this.jsonService.getData('assets/data/languages.json').subscribe(data => {
        this.languages = data as Language[];
      });
    }
  }

  /**
   * On Language change event
   * @param language the language selected
   */
  onLanguageChange(language) {
    console.log('... language changed to: ' + language);
    this.translate.use(language);

    if (localStorage) {
      localStorage['language'] = language;
    }
    this.languageSelected = language;
  }
}
