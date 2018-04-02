const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const reporter = require("cucumber-html-reporter");
const report = require("cucumber-html-report");
const htmlReports = process.cwd() + "/reports/html";
const targetJson = process.cwd() + `/reports/json/cucumber_report.${process.pid}.json`;

const cucumberReportOptions = {
  source: targetJson,                   // source json
  dest: htmlReports,                    // target directory (will create if not exists)
  name: "cucumber_report.html",         // report file name (will be index.html if not exists)
  title: 'Cucumber Report',             // Title for default template. (default is Cucumber Report)
  dateformat: 'YYYY MM DD',             // default is YYYY-MM-DD hh:mm:ss
  maxScreenshots: 10                    // Max number of screenshots to save (default is 1000)
};

const cucumberReporterOptions = {
  theme: 'bootstrap',
  jsonFile: targetJson,
  output: htmlReports + '/cucumber_reporter.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "App Version": "2.1.0",
    "Test Environment": process.env.NODE_ENV || 'local'
  }
};

class Reporter {

  /**
   * Create new directory if not exist
   * @param dirName
   */
  static createDirectory(dirName) {
    //Check if the directory exist
    if (!fs.existsSync(dirName)) {
      mkdirp.sync(dirName);
    }
  }

  /**
   * Remove list of directories and content recursively
   * @param paths the list of folders to be removed
   */
  static removeDirectories(paths) {
    if(paths){
      paths.forEach((path) => {
        Reporter.removeDirectory(path);
      })
    };
  }

  /**
   * Remove directory and content recursively
   * @param path the directory to be removed
   */
  static removeDirectory(path) {
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach(function (file, index) {
        var curPath = path + "/" + file;
        if (fs.lstatSync(curPath).isDirectory()) { // recurse
          Reporter.removeDirectory(curPath);
        } else {
          // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  }

  /**
   * @name writeScreenShot
   * @description Write a screenshot string to file.
   * @param {String} data The base64-encoded string to write to file
   * @param {String} filename The name of the file to create (do not specify directory)
   */
  static writeScreenShot (data, filename) {
    var stream = fs.createWriteStream(filename);

    stream.write(new Buffer(data, 'base64'));
    stream.end();
  }

  /**
   * Create an html report output
   */
  static createHTMLReport() {
    try {
      reporter.generate(cucumberReporterOptions); //invoke cucumber-html-reporter
      report
        .create(cucumberReportOptions)
        .then(function () {
          console.log("File cucumber_report.html created successfully!");
        })
        .catch(function (err) {
          if (err) console.error("Failed to save cucumber test results to json file." + err);
        });
    } catch (err) {
      if (err) {
        console.log("Failed to save cucumber test results to json file." + err);
      }
    }
  }
}

module.exports = Reporter;
