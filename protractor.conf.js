// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

'use strict';
const config = require('./protractor.shared.conf').config;
const chrome = require('./e2e/config/browsers/chrome.config').config;

// NOTE: To run this tests the application must be running in localhost:4200.
config.baseUrl = 'http://localhost:4200/';

// Use the standalone Selenium server.
chrome.directConnect = true;

config.capabilities = chrome;

exports.config = config;
