/**
 * Created by Jan Koszela on 16.05.2017.
 */
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var ncu = require('npm-check-updates');
var run = require('gulp-run');


var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var runSequence = require('run-sequence');
var del = require('del');


// configuration
var paths = {
  allScripts: [
      'gulpfile.js',
      '!src/**/*.min.js',
      'src/**/*.js',
      '!web/js/*.js',
      'web/js/*.js',
      'test/**/*.js'
    ],

  // other matters
  vendors: [
      'vendor/angular-animate',
      'vendor/angular-touch',
      'vendor/angularjs',
      'vendor/angular-ui-bootstrap',
      'vendor/bootstrap',
      'vendor/font-awesome',
      'vendor/jquery'
  ],

  // htmls
  html: 'index.html',

  // less
  less: 'web/styles/less',
  excludeLess: [
      '!web/styles/less/mixins.less',
      '!web/styles/less/variables.less'
  ],

  // sass
  sass: 'web/styles/scss',
  excludeSass: [
    '!web/styles/scss/_mixins.scss',
    '!web/styles/scss/_variables.scss'
  ],

  // css
  css: 'web/styles/css',

  // javascript
  js: 'web/scripts/js',
  excludeJs: '!web/scripts/js/**/*.min.js',
  mainJs: 'main.js',

  // For build
  build: 'build',

  // For distribution
  distro: 'distro'

};

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
////////////////   Dependency  Management //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// PUBLIC
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
    '!node_modules/font-awesome/*.json',
    '!node_modules/font-awesome/less/*',
    '!node_modules/font-awesome/less',
    '!node_modules/font-awesome/scss/*',
    '!node_modules/font-awesome/scss'
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
});

// PUBLIC
// Get up-to-date dependency
//
gulp.task('update', function () {
  runSequence('checkDependencyUpdate', 'updatePackageJson')
});

// PRIVATE
// Check for dependency updates in package.json
//
gulp.task('checkDependencyUpdate', function () {
  ncu.run({
    // Always specify the path to the package file
    packageFile: 'package.json',
    // Any command-line option can be specified here.
    silent: false,
    upgrade: false,
    jsonUpgraded: true
  })
      .then(function (upgraded) {
        console.log('\n\nDEPENDENCIES TO BE UPDATED:\n', upgraded)
      })
});

// PRIVATE
//  Update package.json file to have up-to date dependencies
//  using 'npm-check-update'
//
gulp.task('updatePackageJson', function () {

  ncu.run({
    // Always specify the path to the package file
    packageFile: 'package.json',
    // Any command-line option can be specified here.
    silent: false,
    upgrade: true,
    jsonUpgraded: false
  })
      .then(function (upgraded) {
        var isUpgraded = (upgraded == null);
        console.log('\n\nIs package.json up-to-date: ', isUpgraded);
      })

});

// PRIVATE FIXME
// Update catalog 'node_modules' based on package.json file
// TODO: Need administrator privileges, do not run,
// TODO: till better solution will be provided
gulp.task('updateNpm', function () {
  console.log('node_modules will be updated, this operation can took few minutes');
    return run('npm update').exec()
});


////////////////////////////////////////////////////////////////////////////////
////////////////        Distribution      //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// PUBLIC
// Run application in production mode from  'distro' folder
//
gulp.task('prod', ['browserSyncProd'], function() {

  // Reloads the browser whenever HTML or JS files change
  gulp.watch(paths.distro+'/*.html', browserSync.reload);
  gulp.watch(paths.distro+'/web/scripts/js/**/*.js', browserSync.reload);
  gulp.watch(paths.distro+'/web/styles/css/*.css', browserSync.reload);

  gulp.watch(paths.distro+'/src/**/*.*', browserSync.reload)
  gulp.watch(paths.distro+'/resources/data/*.json', browserSync.reload);
  gulp.watch(paths.distro+'/resources/media/**/*.*', browserSync.reload);

});

////////////////////////////////////////////////////////////////////////////////
////////////////     Build  Management    //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// PUBLIC
// Build artifacts
//
gulp.task('build',  function (callback) {
  runSequence('clean', ['styles', 'scripts'],
      'vendor', 'resources', 'html:index', 'source', 'distro', callback);
});

// PRIVATE
// cleaning everything in build
// including removing build folder
//
gulp.task('clean', function () {
  del(['build', 'distro']);
});

// PRIVATE
// Preparing distribution.
//
gulp.task('distro', function() {

  // Vendor
  gulp.src(paths.build+'/**/*.*')
    .pipe(gulp.dest(paths.distro));

});

// PRIVATE
// Copy vendors to 'build' folder
//
gulp.task('vendor', function() {
  gulp.src('vendor/**/*')
    .pipe(gulp.dest(paths.build+'/vendor'));
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
      baseDir: 'distro'
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
        .pipe(header(banner, {pkg: pkg}))       // add banner to each scss file
        .pipe(autoprefixer(autoprefixerOptions))  // autoprefixer
      .pipe(sourcemaps.write(''))                 // relative path
      .pipe(gulp.dest(paths.css+'/out'))
      .pipe(browserSync.reload({
        stream: true
      }))
      // .pipe(notify({ message: '\'sass\' task complete' }))
});


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


////////////////////////////////////////////////////////////////////////////////
////////////////    Resources  Management //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// PUBLIC
// Preparing resources
//
gulp.task('resources', function () {
  gulp.src('resources/**/*.*')
    .pipe(gulp.dest(paths.build + '/resources'));
});


////////////////////////////////////////////////////////////////////////////////
////////////////    Sources Management //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// PUBLIC
// Preparing sources
//
gulp.task('source', function () {
  return gulp.src([
    'src/**/*.*'
  ])
      .pipe(gulp.dest(paths.build+'/src'))
});

////////////////////////////////////////////////////////////////////////////////
////////////////    SPA Application       //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// PUBLIC
// Preparing index.html
//
gulp.task('html:index', function () {
  return gulp.src(paths.html)
      .pipe(gulp.dest(paths.build))
});

