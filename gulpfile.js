/**
 * Created by Jan Koszela on 16.05.2017.
 */
var gulp = require('gulp');

var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var livereload = require('gulp-livereload');
var bump = require('gulp-bump');

var paths = require('./gulp/gulpPaths.json');
var requireDir = require('require-dir');
requireDir('./gulp');

////////////////////////////////////////////////////////////////////////////////
////////////////        Distribution      //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// PUBLIC
// Run application in production mode from  'distro' folder
//
gulp.task('serve:prod', function() {
  runSequence('build:prod', 'html:prod', 'dist',  'browserSyncProd');
});

gulp.task('serve:dev', function () {
  runSequence('build', 'html:dev', 'browserSyncDev');

  livereload.listen();
  // Reloads the browser whenever HTML or JS files change
  gulp.watch(paths.less+'/*.less', ['styles']);
  gulp.watch(paths.css+'/*.css', ['styles']);
  gulp.watch(paths.js+'/*.js', ['scripts']);
  gulp.watch(paths.source+'/*.html', ['html:dev']);

  // Reloads the browser whenever files from 'data' or 'media' folder will change
  gulp.watch('resources/data/*.json', browserSync.reload);
  gulp.watch('resources/media/**/*.*', browserSync.reload);

  // Reloads the browser whenever HTML or JS files change
  gulp.watch('*.html', browserSync.reload);
  gulp.watch(paths.js+'/*.js', browserSync.reload);

  // Reload the browsert whenever CSS files changed
  gulp.watch(paths.css+'/*.css', browserSync.reload);
  gulp.watch(paths.less+'/*.less', browserSync.reload);
});

////////////////////////////////////////////////////////////////////////////////
////////////////     Build  Management    //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// PRIVATE
// Preparing distribution for production.
//
gulp.task('dist', function() {

  // Angular files
  var angularSource = [
    paths.build +'/' + paths.angularApp + '/*bundle*.js',
    paths.build +'/' + paths.angularApp + '/**/*.html'
  ];
  var angularDestination = paths.dist +'/'+paths.angularApp;

  gulp.src(angularSource)
    .pipe(gulp.dest(angularDestination));

  // Index.html
  gulp.src(paths.build + '/index.html')
    .pipe(gulp.dest(paths.dist));

  // Vendor *.js files
  var vendorScriptsSource = [
    paths.build+'/'+paths.vendor+'/*.bundle*.js',
    // '!'+paths.build+'/'+paths.vendor+'/*.js'
  ];
  var vendorScriptsDestination = paths.dist + '/' + paths.vendor;
  gulp.src(vendorScriptsSource)
    .pipe(gulp.dest(vendorScriptsDestination));

  // Vendor *.css files
   var vendorStylesSource = [
     paths.build+'/'+paths.vendor+'/**/*.*',
     '!'+paths.build+'/'+paths.vendor+'/**/angula*',
     '!'+paths.build+'/'+paths.vendor+'/**/jquery*'
   ];
   var vendorStylesDestination = paths.dist+'/'+paths.vendor;
  gulp.src(vendorStylesSource)
    .pipe(gulp.dest(vendorStylesDestination));

  // Resources
  gulp.src(paths.build+'/'+paths.resources+'/**/*.*')
    .pipe(gulp.dest(paths.dist+'/'+paths.resources));

  // Scripts
  var scriptsSource = [
    paths.build+'/'+paths.jsOut+'/*.min.*',
  ];
  var scriptsDestination = paths.dist + '/' + paths.jsOut;
  gulp.src(scriptsSource)
    .pipe(gulp.dest(scriptsDestination));

  // Styles
  var stylesSource = [
    paths.build+'/'+paths.css+'/*.min.css*'
  ];
  var stylesDestination = paths.dist+'/'+paths.css;

  return gulp.src(stylesSource)
    .pipe(gulp.dest(stylesDestination));

});

////////////////////////////////////////////////////////////////////////////////
////////////////   BrowserSync Management //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//
// Configure the browserSync task for Production
//
gulp.task('browserSyncProd', function() {
  browserSync.init({
    server: {
      baseDir: paths.dist
    },
  })
});

//
// Configure the browserSync task for development
//
gulp.task('browserSyncDev', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  })
});

////////////////////////////////////////////////////////////////////////////////
////////////////   Semantic Versioning    //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

gulp.task('bump', function () {
  gulp.src('./package.json')
    .pipe(bump())
    .pipe(gulp.dest('./'))
});
