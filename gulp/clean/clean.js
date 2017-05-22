/**
 * Created by Jan Koszela on 22.05.2017.
 */
var gulp = require('gulp');

// Project paths to manage
var paths = require('../gulpPaths.json');
var pkg = require('../../package.json');
// Set the banner content
var banner = ['/*!\n',
  ' * PortfolioSite - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright ' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
  ' */\n',
  ''
].join('');

var del = require('del');
// PUBLIC
// cleaning everything in build
// including removing build folder
//
gulp.task('clean', function () {
  del(['build', 'distro']);
});