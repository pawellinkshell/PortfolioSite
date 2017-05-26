/**
 * Created by Jan Koszela on 22.05.2017.
 */

var gulp = require('gulp');
var concat = require('gulp-concat');
var order = require('gulp-order2');
var rev = require('gulp-rev');

var runSequence = require('run-sequence');

// Project paths to manage
var paths = require('../gulpPaths.json');

////////////////////////////////////////////////////////////////////////////////
////////////////    Sources Management //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// PUBLIC
// Preparing sources
//
gulp.task('source', function () {

  // take everything except 'index.base.html' file
  var sourceFileSource = [
        paths.source+'/**/*.*',
        '!'+paths.source+'/'+paths.html
      ];
  var sourceDestination = paths.build+'/'+ paths.source;
  
  return gulp.src(sourceFileSource)
    .pipe(gulp.dest(sourceDestination))
});

// PUBLIC
// Preparing sources for production used
//
gulp.task('source:prod', function (cb) {
  runSequence('copyProject', 'prepareAngular', cb);
});

// 'source:prod' routine
//
// Copy all from build except: index.html and angular files
gulp.task('copyProject', function () {

  var sourceFilesSource = [
        paths.source+'/**/*.*',
        '!'+paths.source+'/'+paths.html,
        '!'+paths.angularApp
      ];
  var sourceDestination = paths.build+'/'+ paths.source;
  
  return gulp.src(sourceFilesSource)
        .pipe(gulp.dest(sourceDestination))
});

// 'source:prod' routine
//
// Concatenate all angular files in order and without minification
gulp.task('prepareAngular', function () {
  var angularSource = paths.angularApp+'/**/*.js';
  var angularDestination = paths.build+'/'+ paths.angularApp;

  var sortOrderFiles = [
        "**/*.module.js"
      ];

  var projectAngularBundleFile = 'project.angular.bundle.js';

  return gulp.src(angularSource)
    .pipe(order(sortOrderFiles))
    .pipe(concat(projectAngularBundleFile))
    .pipe(rev())
    .pipe(gulp.dest(angularDestination))
});