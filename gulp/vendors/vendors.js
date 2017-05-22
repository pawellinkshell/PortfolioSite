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

// PRIVATE
// Copy vendors to 'build' folder
//
gulp.task('vendor', function() {
  gulp.src('vendor/**/*')
    .pipe(gulp.dest(paths.build+'/vendor'));
});
