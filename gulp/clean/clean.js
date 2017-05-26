/**
 * Created by Jan Koszela on 22.05.2017.
 */
var gulp = require('gulp');
var del = require('del');

// Project paths to manage
var paths = require('../gulpPaths.json');

// PUBLIC
// cleaning everything in build
// including removing build folder
//
gulp.task('clean', function () {
  del([
    paths.build,      // 'build' folder
    paths.dist,       // 'dist' folder
    paths.css,        // 'css' folder
    paths.jsOut,      // 'js/out' folder
    paths.html        // 'index.html' file (not from 'src' folder)
  ]);

});