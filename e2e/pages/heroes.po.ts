import {browser, by, element} from 'protractor';
import {CommonPage} from './common.po';

export class HeroesPage extends CommonPage {
  readonly title = element(by.tagName('h1'));

  getElementRequired() {
    return element(by.id('heroListContent'));
  }
}
