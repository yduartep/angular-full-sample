'use strict';

exports.config = chromeConfig();

function chromeConfig() {
  return {
    browserName: 'chrome',
    chromeOptions: {
      args: ['disable-infobars'],
      prefs: {
        'credentials_enable_service': false,
        'profile': {
          'password_manager_enabled': false
        }
      }
    },
    shardTestFiles: true,
    maxInstances: 5,
    requireWindowFocus: false
  };
}
