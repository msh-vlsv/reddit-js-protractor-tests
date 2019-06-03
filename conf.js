let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
let HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

let reporter = new HtmlScreenshotReporter({
    dest: 'target/screenshots',
    filename: 'reddit-test-report.html',
    reportTitle: 'Reddit Test Report'
  });

exports.config = {
    framework: 'jasmine2',

    seleniumAddress: 'http://localhost:4444/wd/hub',

    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            prefs: {
                'profile.managed_default_content_settings.geolocation': 2,
                'profile.managed_default_content_settings.notifications': 2
            }
        }
    },

    baseUrl: 'https://www.reddit.com',

    logLevel: 'WARN',

    beforeLaunch: function() {
        process.on('uncaughtException', function () {
            reporter.jasmineDone();
            reporter.afterLaunch();
        });
        return new Promise(function(resolve){
            reporter.beforeLaunch(resolve);
        });
      },

    onPrepare: function() {
        browser.ignoreSynchronization = true;
        browser.manage().window().maximize();
        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
              displayStacktrace: true
            },
            summary: {
                displayDuration: false
              }
          })),
          jasmine.getEnv().addReporter(reporter);
    },

    afterLaunch: function(exitCode) {
        return new Promise(function(resolve){
            reporter.afterLaunch(resolve.bind(this, exitCode));
        });
    },

    specs: [
        './test/front.spec.js',
        './test/CRUD_post.spec.js',
    ],

    jasmineNodeOpts: {
        showColors: true,
        silent: true,
        defaultTimeoutInterval: 360000,
        print: function() {}
    }
};
