/**
 * Created by Jan Koszela on 22.05.2017.
 */
var gulp = require('gulp');
var runSequence = require('run-sequence');

// Required gulp tasks
var requireStyles = require('require-dir')('./styles');
var requireScripts = require('require-dir')('./scripts');
var requireResources = require('require-dir')('./resources');
var requireVendors = require('require-dir')('./vendors');
var requireSources = require('require-dir')('./sources');
var requireHtml = require('require-dir')('./html');
var requireClean = require('require-dir')('./clean');


var paths = require('./gulpPaths.json');

// PUBLIC
// Build artifacts
//
gulp.task('build',  function (callback) {
  runSequence('clean', ['styles', 'scripts'],
    'vendor', 'resources', 'html:index', 'source', callback);
});
