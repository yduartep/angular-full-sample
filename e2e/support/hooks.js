"use strict";
const {browser, by, element} = require("protractor");
const {BeforeAll, After, Status} = require("cucumber");

/**
 * Go the angular starter page before to start eah test
 */
BeforeAll({timeout: 30 * 1000}, function (callback) {
  browser.get('http://localhost:4200').then(() => {
    callback();
  });
});

After(function (scenario, done) {
  var world = this;

  browser.takeScreenshot().then(function (png) {
    world.attach(png, 'image/png');

    // logout before to start the next test
    element(by.id('linkLogout')).click().then(() => {
      done();
    });
  });
});


