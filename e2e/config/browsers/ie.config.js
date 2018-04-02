'use strict';

exports.config = internetExplorerConfig();

function internetExplorerConfig() {
  return {
    browserName: "internet explorer",
    version: 11,
    shardTestFiles: true,
    maxInstances: 5,
    requireWindowFocus: false,
    javascriptEnabled: true,
    cssSelectorsEnabled: true,
    elementScrollBehavior: 0,
    ignoreZoomSetting: true,
    ignoreProtectedModeSettings: true,

    enablePersistentHover: false,
    "ie.ensureCleanSession": false,
    enableElementCacheCleanup: true,
    unexpectedAlertBehaviour: "dismiss",
    "ie.usePerProcessProxy": false,
    handlesAlerts: true,
    initialBrowserUrl: "http://localhost:4200/",
    "ie.forceCreateProcessApi": false,
    nativeEvents: false,
    browserAttachTimeout: 0,
    takesScreenshot: true
  };
}

