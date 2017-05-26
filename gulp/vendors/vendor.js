/**
 * Created by Jan Koszela on 24.05.2017.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var order = require('gulp-order2');
var rev = require('gulp-rev');


// Project paths to manage
var paths = require('../gulpPaths.json');

gulp.task('vendor', function() {

  // Prepare vendors scripts
  var vendorSource = [
    paths.vendor+'/**/*min.js',
    paths.vendor+'/**/*tpls.js'
  ];
  var vendorDestination = paths.build+'/'+paths.vendor;

  var sortOrderVendor = [
    "**/*jquery*",
    "**/*bootstrap.*",
    "**/*angular.*"
  ];
  var vendorBundleFile = 'vendor.bundle.js';

  gulp.src(vendorSource)
    .pipe(order(sortOrderVendor))
    .pipe(concat(vendorBundleFile))
    .pipe(rev())
    .pipe(gulp.dest(vendorDestination))
});