/**
 * Created by Jan Koszela on 22.05.2017.
 */
var gulp = require('gulp');
var header = require('gulp-header');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rev = require('gulp-rev');

var eslint = require('gulp-eslint');

var del = require('del');
var browserSync = require('browser-sync').create();

// Project paths to manage
var paths = require('../gulpPaths.json');
var pkg = require('../../package.json');
// Set the banner content
var banner = ['/*!\n',
  ' * PortfolioSite - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright ' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
  ' */\n',
  ''
].join('');

////////////////////////////////////////////////////////////////////////////////
////////////////    JavaScript Management //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// PUBLIC
// Prepare scripts
//
gulp.task('scripts', ['eslint'], function () {
  var scriptSource = paths.jsOut+'/*.js';
  var scriptDestination = paths.jsOut;

  return gulp.src(scriptSource)
    .pipe(uglify())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(scriptDestination))  // put js artifact
    .pipe(browserSync.reload({
      stream: true
    }));
});

// PUBLIC
// Prepare scripts for production
//
gulp.task('scripts:prod', ['lint'], function () {
  var scriptSource = paths.jsOut+'/*.js';
  var scriptDestination = paths.jsOut;

  var projectScriptBundleFile = 'project.bundle.js';

  return gulp.src(scriptSource)
    .pipe(uglify())
    .pipe(concat(projectScriptBundleFile))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(rev())
    .pipe(gulp.dest(scriptDestination))  // put js artifact
});


// PRIVATE
// lint all js code
//
gulp.task('lint', function () {
  var lintSource = paths.js+'/*.js';
  var lintDestination = paths.jsOut;

  del(paths.jsOut+'/*.js');

  return gulp.src(lintSource)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulp.dest(lintDestination))
});

gulp.task('eslint', function () {
  var lintSource = [
  	paths.js+'/*.js',
		paths.angularApp+'/**/*.js'
	];
  var lintDestination = paths.jsOut;

  del(paths.jsOut+'/*.js');

  return gulp.src(lintSource)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
});