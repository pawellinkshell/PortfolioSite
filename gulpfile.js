/**
 * Created by Jan Koszela on 16.05.2017.
 */
var gulp = require('gulp');
var less = require('gulp-less');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');

// Set the banner content
var banner = ['/*!\n',
  ' * PortfolioSite - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2017-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
  ' */\n',
  ''
].join('');

//
// Copy vendor libraries from /node_modules into /vendor
//
gulp.task('copy', function() {

  // Bootstrap
  gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
      .pipe(gulp.dest('vendor/bootstrap'))

  // jQuery
  gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
      .pipe(gulp.dest('vendor/jquery'))

  // font-awesome
  gulp.src([
    'node_modules/font-awesome/**',
    '!node_modules/font-awesome/**/*.map',
    '!node_modules/font-awesome/.npmignore',
    '!node_modules/font-awesome/*.txt',
    '!node_modules/font-awesome/*.md',
    '!node_modules/font-awesome/*.json'
  ])
      .pipe(gulp.dest('vendor/font-awesome'))

  // AngularJS
  gulp.src([
    'node_modules/angular/angular.js',
    'node_modules/angular/angular.min.js',
    'node_modules/angular/angular.min.js.map'
  ])
      .pipe(gulp.dest('vendor/angularjs'))

  // Angular-touch
  gulp.src([
    'node_modules/angular-touch/angular-touch.js',
    'node_modules/angular-touch/angular-touch.min.js',
    'node_modules/angular-touch/angular-touch.min.js.map'
  ])
      .pipe(gulp.dest('vendor/angular-touch'))

  // Angular-animate
  gulp.src([
    'node_modules/angular-animate/angular-animate.js',
    'node_modules/angular-animate/angular-animate.min.js',
    'node_modules/angular-animate/angular-animate.min.js.map'
  ])
      .pipe(gulp.dest('vendor/angular-animate'))

  // Angular-UI-bootstrap
  gulp.src([
    'node_modules/angular-ui-bootstrap/dist/*'
  ])
      .pipe(gulp.dest('vendor/angular-ui-bootstrap'))
})

//
// Run everything
//
gulp.task('default', ['less', 'minify-css', 'minify-js', 'copy']);

////////////////////////////////////////////////////////////////////////////////
////////////////   BrowserSync Management //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//
// Configure the browserSync task
//
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  })
})

//
// Dev task with browserSync
//
gulp.task('dev', ['browserSync', 'less', 'minify-css', 'minify-js'], function() {
  gulp.watch('web/less/*.less', ['less']);
  gulp.watch('web/css/*.css', ['minify-css']);
  gulp.watch('web/js/*.js', ['minify-js']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('web/js/**/*.js', browserSync.reload);
});

////////////////////////////////////////////////////////////////////////////////
////////////////    StyleSheet Management //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//
// Compile LESS files from /less into /css
//
gulp.task('less', function() {
  return gulp.src('web/less/portfolio.less')
      .pipe(less())
      .pipe(header(banner, { pkg: pkg }))
      .pipe(gulp.dest('web/css'))
      .pipe(browserSync.reload({
        stream: true
      }))
});

//
// Compiles SCSS files from /scss into /css
// NOTE: This project uses LESS by default. To swtich to SCSS you will need to update this gulpfile by changing the 'less' tasks to run 'sass'!
//
gulp.task('sass', function() {
  return gulp.src('web/scss/portfolio.scss')
      .pipe(sass())
      .pipe(header(banner, { pkg: pkg }))
      .pipe(gulp.dest('web/css'))
      .pipe(browserSync.reload({
        stream: true
      }))
});

//
// Minify compiled CSS
//
gulp.task('minify-css', ['less'], function() {
  return gulp.src('web/css/portfolio.css')
      .pipe(cleanCSS({ compatibility: 'ie8' }))
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('web/css'))
      .pipe(browserSync.reload({
        stream: true
      }))
});

////////////////////////////////////////////////////////////////////////////////
////////////////    JavaScript Management //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// Minify JS
gulp.task('minify-js', function() {
  return gulp.src('web/js/portfolio.js')
      .pipe(uglify())
      .pipe(header(banner, { pkg: pkg }))
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('web/js'))
      .pipe(browserSync.reload({
        stream: true
      }))
});