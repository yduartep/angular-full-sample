import {Component, Inject, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  styleUrls: ['./villains.component.css'],
  template: `<router-outlet></router-outlet>`
})
export class VillainsComponent implements OnInit {

  constructor(@Inject('defaultLanguage') private defaultLanguage: string,
              private translate: TranslateService) {

    translate.use(localStorage['language'] || defaultLanguage);
  }

  ngOnInit() {
    console.log('... Initializing Villains component');
  }

}
