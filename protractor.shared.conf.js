// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
const argv = require('yargs').argv;
const jsonReports = process.cwd() + '/reports/json';
const htmlReports = process.cwd() + "/reports/html";

const Reporter = require('./e2e/support/reporter');

exports.config = {
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  specs: getFeatureFiles(),
  cucumberOpts: {
    compiler: ['ts:ts-node/register'],
    require: ['./e2e/**/*.e2e-spec.ts', './e2e/support/*.js'],
    strict: false,         // <boolean> fail if there are any undefined or pending steps
    format: 'json:./reports/json/cucumber_report.json',
    dryRun: false,        // <boolean> invoke every formatter without executing steps
    tags: ["~@ignore"],   // <string[]> (expression) only execute the features or scenarios with tags matching the expression
  },
  onPrepare: function () {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    browser.manage().window().maximize();

    // implicit and page load timeouts
    browser.manage().timeouts().pageLoadTimeout(40000);
    browser.manage().timeouts().implicitlyWait(25000);

    Reporter.removeDirectories([jsonReports, htmlReports]);
    Reporter.createDirectory(jsonReports);
  },
  onComplete: function () {
    Reporter.createHTMLReport();
  },
  allScriptsTimeout: 60000,
  disableChecks: true,
  useAllAngular2AppRoots: true
};

/**
 * Get the feature files that need to be run based on an command line flag that
 * is passed, if nothing is passed all the feature files are run
 *
 * @example:
 *
 * <pre>
 *     // For 1 features
 *     npm run e2e -- --features=playground
 *
 *     // For multiple features
 *     npm run e2e -- --features=playground,dashboard,...
 *
 *     // Else
 *     npm run e2e
 * </pre>
 *
 * @return {Array<string>}
 */
function getFeatureFiles() {
  const featureArgs = argv.features || process.env['features'] || '';
  if (featureArgs && featureArgs.trim().length > 0) {
    console.log('... loading feature files by parameters. features=' + featureArgs);
    return featureArgs.split(',').map(feature => `${process.cwd()}/e2e/features/${feature}.feature`);
  } else {
    console.log('... loading ALL feature files.');
    return [`${process.cwd()}/e2e/features/*.feature`];
  }
}
