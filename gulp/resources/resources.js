/**
 * Created by Jan Koszela on 22.05.2017.
 */
var gulp = require('gulp');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');

var runSequence = require('run-sequence');

// Project paths to manage
var paths = require('../gulpPaths.json');

////////////////////////////////////////////////////////////////////////////////
////////////////    Resources  Management //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// PUBLIC
// Preparing resources
//
gulp.task('resources', function (callback) {
  runSequence('images', 'video', 'data', callback);
});

//
// Minify images from 'resources' folder
// copy when it is needed
gulp.task('images', function () {
  var imageSource = paths.media + '/img/**/*.+(png|jpg)';
  var imageDestination = paths.build + '/' + paths.media+'/img';

  return gulp.src(imageSource)
    .pipe(changed(imageDestination))
    .pipe(imagemin())
    .pipe(gulp.dest(imageDestination));
});

//
// Copy *.json files from 'data' folder
gulp.task('data', function () {
  var dataSource = paths.data + '/*.*';
  var dataDestination = paths.build + '/' + paths.data;

  return gulp.src(dataSource)
    .pipe(changed(dataDestination))
    .pipe(gulp.dest(dataDestination));
});


//
// copy *.mp4 files from 'video' folder
gulp.task('video', function () {
  var videoSource = paths.media + '/video/**/*.+(mp4)';
  var videoDestination = paths.build + '/' + paths.media+'/video';

  return gulp.src(videoSource)
    .pipe(changed(videoDestination))
    .pipe(gulp.dest(videoDestination));
});