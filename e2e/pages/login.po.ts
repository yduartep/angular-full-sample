import {browser, by, element} from 'protractor';
import {CommonPage} from './common.po';

export class LoginPage extends CommonPage {

  readonly title = element(by.className('title'));
  readonly username = element(by.id('username'));
  readonly password = element(by.id('password'));
  readonly loginButton = element(by.id('btnLogin'));
  readonly pathUrl = '/login';

  getElementRequired() {
    return element(by.id('loginContent'));
  }

  /**
   * Log in into the application
   * @param {string} username the username
   * @param {string} password the password
   * @param done the callback function
   * @returns {Promise<any[]>}
   */
  login(username: string = 'guest', password: string = 'guest123', done: any) {
    const usernameValue = this.setUsername(username);
    const passwordValue = this.setPassword(password);
    const promises = [usernameValue, passwordValue];
    return Promise.all(promises).then((result) => {
      console.log('Now click on login button');
      return this.submit().then(() => {
        done();
      });
    });
  }

  /**
   * Set the username in the field
   * @param {string} value the value
   * @returns {any} the promise
   */
  setUsername(value: string) {
    return this.setValue(this.username, value);
  }

  /**
   * Set the password in the field
   * @param {string} value the value
   * @returns {any} the promise
   */
  setPassword(value: string) {
    return this.setValue(this.password, value);
  }

  /**
   * Login action when submit
   * @returns {any} the promise
   */
  submit() {
    return this.loginButton.click();
  }

  /**
   * Go to the login page
   * @returns {wdpromise.Promise<any>} the promise
   */
  navigateTo() {
    return browser.get(this.pathUrl);
  }
}
