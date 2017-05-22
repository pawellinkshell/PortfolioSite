/**
 * Created by Jan Koszela on 22.05.2017.
 */
var gulp = require('gulp');
var runSequence = require('run-sequence');
var ncu = require('npm-check-updates');

////////////////////////////////////////////////////////////////////////////////
////////////////   Dependency  Management //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

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