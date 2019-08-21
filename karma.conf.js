const path = require('path');
const webpack = require('karma-webpack');

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      './node_modules/babel-polyfill/dist/polyfill.js',
      '__tests__/**/*-test.js'
    ],
    plugins: [webpack, 'karma-jasmine', 'karma-phantomjs-launcher', 'karma-spec-reporter', 'karma-coverage-istanbul-reporter'],
    browsers: ['PhantomJS'],
    coverageReporter: {
      dir: path.join(__dirname, 'public/reports/coverage'),
      reporters: [
        { type: 'lcov', subdir: 'reports' }
      ]
    },
    coverageIstanbulReporter: {
      dir: path.join(__dirname, 'public/reports/coverage'),
    },
    reporters: ['spec', 'coverage-istanbul'],
    colors: true,
    preprocessors: {
      '__tests__/**/*-test.js': ['webpack']
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.js?$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.js/,
            enforce: 'post',
            exclude: /(__tests__|node_modules)/,
            use: {
              loader: 'istanbul-instrumenter-loader',
              options: { esModules: true }
            }
          }
        ]
      }
    },
    webpackMiddleware: { noInfo: true }
  });
};
