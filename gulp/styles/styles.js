/**
 * Created by Jan Koszela on 22.05.2017.
 */

var gulp = require('gulp');
var less = require('gulp-less');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');

var header = require('gulp-header');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');

var del = require('del');

var livereload = require('gulp-livereload');
var browserSync = require('browser-sync').create();
var pkg = require('../../package.json');

// Project paths to manage
var paths = require('../gulpPaths.json');

// autoprefixer, point for which browsers preprocessor should
// produce css prefixes used in each engine browsers for *.css file
//
var autoprefixerOptions = {
  browsers: ['safari 5', 'firefox 20', 'ie 8', 'opera 12.1', 'ios 6', 'android 4']
};

// Set the banner content
var banner = ['/*!\n',
  ' * PortfolioSite - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright ' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
  ' */\n',
  ''
].join('');

////////////////////////////////////////////////////////////////////////////////
////////////////    StyleSheet Management //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// PUBLIC
// Preparing minifed with sourcemap stylesheets
//
gulp.task('styles', ['less'], function() {
  var stylesSource = paths.less+'/*.css';
  var stylesDestination = paths.css;

  return gulp.src(stylesSource)
    .pipe(sourcemaps.init({loadMaps: true}))    // create maps from less/scss *sourcemaps* not the css
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write(''))
    .pipe(rev())
    .pipe(gulp.dest(stylesDestination)) // put css artifact
    .pipe(livereload())

  // .pipe(browserSync.reload({
    //   stream: true
    // }))
});

// PRIVATE
// Compile LESS files from /less into /css
//
gulp.task('less', function() {
  var lessSource = [
    paths.less +'/*.less',
    paths.excludeLess[0],
    paths.excludeLess[1]
  ];
  var lessDestination = paths.less;

  del(lessDestination+'/*.css*');

  return gulp.src(lessSource)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest(lessDestination))
    .pipe(livereload())
  // .pipe(browserSync.reload({
    //   stream: true
    // }))
});


// PUBLIC
// Preparing minifed with sourcemap stylesheets
//
gulp.task('styles:prod', ['less:prod'], function() {
  var stylesSource = paths.css+'/*.css';
  var stylesDestination = paths.css;

  return gulp.src(stylesSource)
    .pipe(sourcemaps.init({loadMaps: true}))    // create maps from less/scss *sourcemaps* not the css
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(rev())
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest(stylesDestination)) // put css artifact
});


// PRIVATE
// Compile LESS files from /less into one bundled /css
//
gulp.task('less:prod', function() {
  var lessSource = [
        paths.less +'/*.less',
        paths.excludeLess[0],
        paths.excludeLess[1]
      ];
  var lessDestination = paths.css;

  var lessBundleFile = 'project.bundle.css';

  return gulp.src(lessSource)
    .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(concat(lessBundleFile))                 // concatenate all css files
      .pipe(header(banner, { pkg: pkg }))
      .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest(lessDestination))
});

// PRIVATE
// Compiles SCSS files from /scss into /css
// NOTE: This project uses LESS by default. To swtich to SCSS you will need to update this gulpfile by changing the 'less' tasks to run 'sass'!
//
gulp.task('sass', function() {
  var sassSource = [
        paths.sass + '/*.scss',
        paths.excludeSass[0],
        paths.excludeSass[1]
      ];
  var sassDestination = paths.css;
  return gulp.src(sassSource)
    .pipe(sourcemaps.init())                      // create maps from scss partials
      .pipe(sass())
      .pipe(header(banner, {pkg: pkg}))           // add banner to each scss file
      .pipe(autoprefixer(autoprefixerOptions))    // autoprefixer
    .pipe(sourcemaps.write(''))                   // relative path
    .pipe(gulp.dest(sassDestination))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// PRIVATE
// Compiles SCSS files from /scss into /css
// NOTE: This project uses LESS by default. To swtich to SCSS you will need to update this gulpfile by changing the 'less' tasks to run 'sass'!
//
gulp.task('sass:prod', function() {
  var sassSource = [
        paths.sass + '/*.scss',
        paths.excludeSass[0],
        paths.excludeSass[1]
      ];
  var sassDestination = paths.css;

  var lessBundleFile = 'project.bundle.css';

  return gulp.src(sassSource)
    .pipe(sourcemaps.init())                      // create maps from scss partials
    .pipe(sass())
    .pipe(concat(lessBundleFile))                 // concatenate all css files
    .pipe(header(banner, {pkg: pkg}))             // add banner to each scss file
    .pipe(autoprefixer(autoprefixerOptions))      // autoprefixer
    .pipe(sourcemaps.write(''))                   // relative path
    .pipe(gulp.dest(sassDestination))
});