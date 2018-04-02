'use strict';

exports.config = firefoxConfig();

function firefoxConfig() {
  return {
    browserName: 'firefox',
    shardTestFiles: true,
    maxInstances: 5,
    requireWindowFocus: false,
    "alwaysMatch": {
      "moz:firefoxOptions": {
        "binary": "C:/Program Files (x86)/Mozilla Firefox",
        "args": ["--verbose"],
        "log": {
          "level": "trace"
        }
      }
    }
  };
}
