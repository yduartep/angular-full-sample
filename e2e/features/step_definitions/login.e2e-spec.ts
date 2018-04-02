import {browser} from 'protractor';
import {expect} from '../../config/helpers/chai-imports';
import {Given, When, Then} from 'cucumber';


// pages
import {LoginPage} from '../../pages/login.po';
import {HeroesPage} from '../../pages/heroes.po';

const page = new LoginPage();
const heroesPage = new HeroesPage();

Given(/^the user is in the Login page$/, (done: any) => {
  browser.wait(page.getElementRequired().isPresent(), 5000).then(() => {
    done();
  });
});

Given(/^the user set the username '([^']*)'$/, (userId: string, done: any) => {
  page.setUsername(userId).then(() => {
    done();
  });
});

Given(/^the user set the password '([^']*)'$/, (password: string, done: any) => {
  page.setPassword(password).then(() => {
    done();
  });
});

When(/^the user logs in the application$/, () => {
  return page.submit();
});

Then(/^the user is redirected to the Heroes page$/, (done: any) => {
  browser.wait(heroesPage.getElementRequired().isPresent(), 5000).then(() => {
    expect(heroesPage.title.getText()).to.be.eventually.equal('List of Heroes');
    done();
  });
});

Then(/^a cookie with name '([^']*)' is created with the value '([^']*)'$/, (cookieId: string, cookieValue: string, done: any) => {
  browser.wait(heroesPage.getElementRequired().isPresent(), 5000).then(() => {
    browser.manage().getCookie(cookieId).then(cookie => {
      expect(cookie.name).to.equals(cookieId);
      expect(cookie.value).to.equals(cookieValue);
      done();
    });
  });
});
