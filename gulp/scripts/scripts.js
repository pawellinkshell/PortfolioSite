/**
 * Created by Jan Koszela on 22.05.2017.
 */
var gulp = require('gulp');
var header = require('gulp-header');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');

var browserSync = require('browser-sync').create();
var del = require('del');

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
gulp.task('scripts', ['lint'], function () {
  gulp.src(paths.js+'/out/*.js')
    .pipe(uglify())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.build+'/'+paths.js))  // put js artifact
    .pipe(browserSync.reload({
      stream: true
    }));

  del([paths.js+'/out']);  // delete process artifact

});

// PRIVATE
// lint all js code
//
gulp.task('lint', function () {
  return gulp.src(paths.js+'/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat(paths.mainJs))
    .pipe(gulp.dest(paths.js+'/out'))
});

