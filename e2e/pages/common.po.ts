import {browser} from 'protractor';

export abstract class CommonPage {
  /**
   * Gets the elements should be displayed to guarantee the page was correctly loaded
   */
  abstract getElementRequired();

  /**
   * Set a value into the input element
   * @param element the element
   * @param value the value
   * @returns {ActionSequence | promise.Promise<void>}
   */
  setValue(element, value) {
    // return browser.actions().mouseMove(element).click().sendKeys(value).perform();
    return element.click().clear().sendKeys(value);
  }
}
