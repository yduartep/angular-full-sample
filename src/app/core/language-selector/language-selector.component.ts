import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from './language';
import { LanguageService } from './language.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css']
})
export class LanguageSelectorComponent implements OnInit {
  @Input()
  languages: Language[];
  languageSelected: string = localStorage['language'] || 'en';

  constructor(
    private languageService: LanguageService,
    private translate: TranslateService) { }

  ngOnInit() {
    if (!this.languages || this.languages.length == 0) {
      this.languageService.getData().subscribe(data => {
        this.languages = data
      });
    }
  }

  onLanguageChange(language) {
    console.log('... language changed to: ' + language);
    this.translate.use(language);

    if (localStorage) {
      localStorage['language'] = language;
    }
    this.languageSelected = language;
  }
}
