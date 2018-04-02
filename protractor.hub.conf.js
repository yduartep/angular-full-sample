'use strict';
const config = require('./protractor.shared.conf').config;
const chrome = require('./e2e/config/browsers/chrome.config').config;
const firefox = require('./e2e/config/browsers/firefox.config').config;

// NOTE: To run this tests the application must be running in localhost:4200 and
// Selenium hub must be running in localhost:4444.
config.baseUrl = 'http://localhost:4200/';
config.seleniumAddress = 'http://localhost:4444/wd/hub/';

// TODO firefox not working
config.multiCapabilities = [
  chrome//, firefox
];

exports.config = config;
