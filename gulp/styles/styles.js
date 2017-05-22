/**
 * Created by Jan Koszela on 22.05.2017.
 */

var gulp = require('gulp');
var less = require('gulp-less');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var concat = require('gulp-concat');

var header = require('gulp-header');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');

var browserSync = require('browser-sync').create();
var pkg = require('../../package.json');
var del = require('del');

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
  gulp.src(paths.css+'/*.css')
    .pipe(sourcemaps.init({loadMaps: true}))    // create maps from less/scss *sourcemaps* not the css
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest(paths.build+'/'+paths.css)) // put css artifact
    .pipe(browserSync.reload({
      stream: true
    }))

  del([paths.css]);  // delete process artifact
});

// PRIVATE
// Compile LESS files from /less into /css
//
gulp.task('less', function() {
  return gulp.src([paths.less +'/*.less', paths.excludeLess[0], paths.excludeLess[1]])
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.reload({
      stream: true
    }))
  // .pipe(notify({ message: '\'less\' task complete' }))

});

// PRIVATE
// Compiles SCSS files from /scss into /css
// NOTE: This project uses LESS by default. To swtich to SCSS you will need to update this gulpfile by changing the 'less' tasks to run 'sass'!
//
gulp.task('sass', function() {
  return gulp.src(
    [paths.sass + '/*.scss', paths.excludeSass[0], paths.excludeSass[1]])
    .pipe(sourcemaps.init())                    // create maps from scss partials
    .pipe(sass())
    .pipe(header(banner, {pkg: pkg}))           // add banner to each scss file
    .pipe(autoprefixer(autoprefixerOptions))    // autoprefixer
    .pipe(sourcemaps.write(''))                 // relative path
    .pipe(gulp.dest(paths.css+'/out'))
    .pipe(browserSync.reload({
      stream: true
    }))
  // .pipe(notify({ message: '\'sass\' task complete' }))
});
