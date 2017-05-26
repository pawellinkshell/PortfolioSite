/**
 * Created by Jan Koszela on 22.05.2017.
 */
var gulp = require('gulp');
var runSequence = require('run-sequence');

// Required gulp tasks
var requireStyles = require('require-dir')('./styles');
var requireScripts = require('require-dir')('./scripts');
var requireScripts = require('require-dir')('./vendors');
var requireResources = require('require-dir')('./resources');
var requireSources = require('require-dir')('./sources');
var requireHtml = require('require-dir')('./html');
var requireClean = require('require-dir')('./clean');

// PUBLIC
// Build artifacts for development use
//
gulp.task('build',  function (callback) {
  runSequence(
    'clean',
    'styles',
    'scripts',
    'resources',
    'source',
    callback);
});

// PUBLIC
// Build artifacts for production use
//
gulp.task('build:prod',  function (callback) {
  runSequence(
    'clean',
    ['styles:prod', 'scripts:prod'],
    'vendor',
    'resources',
    'source:prod',
    callback);
});