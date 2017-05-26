/**
 * Created by Jan Koszela on 22.05.2017.
 */
var gulp = require('gulp');
var header = require('gulp-header');
var inject = require('gulp-inject');
var rename = require("gulp-rename");
var concat = require('gulp-concat');

var order = require('gulp-order2');
var rev = require('gulp-rev');


// Project paths to manage
var paths = require('../gulpPaths.json');
var pkg = require('../../package.json');
// Set the banner content
var banner = ['<!--\n',
  ' PortfolioSite - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' Copyright ' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
  ' -->\n',
  ''
].join('');

////////////////////////////////////////////////////////////////////////////////
////////////////    SPA Application       //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// PUBLIC
// Preparing index.html for production use
//
gulp.task('html:prod', function () {

  // selects all *.css files from vendor
  var vendorStylesSource = [
        paths.build+'/'+paths.vendor+'/**/*min.css*'
      ];

  var injectVendorStyles = gulp.src(vendorStylesSource, {base: process.cwd()})
    .pipe(rename(function (path) {
        path.dirname = path.dirname.replace('build', '');
    }))

  // selects all *.js file from vendor and set it in order
  var vendorScriptsSource = [
        paths.build+'/'+paths.vendor+'/**/*bundle*.js'
      ];

  var injectVendorScripts = gulp.src(vendorScriptsSource, {base: process.cwd()})
    .pipe(rename(function (path) {
      path.dirname = path.dirname.replace('build', '');
    }))
  ;

  // selects all *.css file from project
  var projectStylesSource = [
       paths.build+'/'+paths.css+'/**/*bundle*min.css'
      ];
  var injectProjectStyles = gulp.src(projectStylesSource, {base: process.cwd()})
    .pipe(rename(function (path) {
      path.dirname = path.dirname.replace('build', '');
    }))
  ;

  // selects all *.js file from project
  var javascriptSource = [
        paths.build+'/'+paths.js+'/**/*bundle*min.js',
      ];
  var injectJavascript = gulp.src(javascriptSource, {base: process.cwd()})
    .pipe(rename(function (path) {
      path.dirname = path.dirname.replace('build', '');
    }))
  ;

  // select all angular base *.js files from 'src' and set it in order
  var angularScriptSource = [
        paths.build+'/'+paths.angularApp+'/*bundle*.js'
      ];
  var injectAngularScripts = gulp.src(angularScriptSource, {base: process.cwd()})
    .pipe(rename(function (path) {
      path.dirname = path.dirname.replace('build', '');
    }))
  ;

  var indexSource = paths.source+'/'+paths.html;
  var indexDestination = paths.build;
  return gulp.src(indexSource)
    .pipe(header(banner, {pkg: pkg}))
    .pipe(rename({ basename: 'index' }))
    .pipe(inject(injectVendorStyles, {name: 'inject:vendor'}))
    .pipe(inject(injectProjectStyles, {name: 'inject:project'}))
    .pipe(inject(injectVendorScripts, {name: 'inject:body:vendor'}))
    .pipe(inject(injectJavascript, {name: 'inject:body:javascript'}))
    .pipe(inject(injectAngularScripts, {name: 'inject:body:angular'}))
    .pipe(gulp.dest(indexDestination))
});


// PUBLIC
// Preparing index.html for development use
//
gulp.task('html:dev', function () {

  // selects all css files from the assets/styles/css
  var stylesSource = [
        paths.vendor+'/**/*.min.css',
        paths.css+'/**/*.min.css'
      ];
  var injectStyles = gulp.src(stylesSource, {read: false});

  // selects all *.js files from 'vendor' and set it in order
  var vendorsSource = [
        paths.vendor+'/**/*.min.js',
        paths.vendor+'/**/*tpls.js'
      ];
  var sortOrderVendorFiles = [
    "**/*jquery*",
    "**/*bootstrap.*",
    "**/*angular.*",
    "**/*.module.js"
  ];
  var injectVendors = gulp.src(vendorsSource, {read: false})
    .pipe(order(sortOrderVendorFiles));

  // select all *.js files from project
  var javascriptSource = [
        paths.js+'/**/*.min.js',
      ];
  var injectJavascript = gulp.src(javascriptSource, {read: false});

  // select all angular base *.js files from 'src' and set it in order
  var angularScriptsSource = [
        paths.angularApp+'/**/*.js'
      ];
  var sortOrderAngularFiles = [
        "**/*.module.js"
      ];
  var injectScripts = gulp.src(angularScriptsSource, {read: false})
    .pipe(order(sortOrderAngularFiles));

  var indexSource = paths.source+'/'+paths.html;
  var indexDestination = '';
  return gulp.src(indexSource)
    .pipe(header(banner, {pkg: pkg}))
    .pipe(rename({ basename: 'index' }))
    .pipe(inject(injectStyles, {name: 'inject:project'}))
    .pipe(inject(injectVendors, {name: 'inject:body:vendor'}))
    .pipe(inject(injectJavascript, {name: 'inject:body:javascript'}))
    .pipe(inject(injectScripts, {name: 'inject:body:angular'}))
    .pipe(gulp.dest(indexDestination))
});


