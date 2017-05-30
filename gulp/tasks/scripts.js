/**
 * Created by Jan Koszela on 29.05.2017.
 */
var gulp = require("gulp"),
	$ = require("gulp-load-plugins")(),
	runSequence = require('run-sequence'),
	config = require("../config"),
	isProduction = config.isProduction();

// PUBLIC
// Prepare scripts for PROD
//
gulp.task("scripts", function (callback) {
	return runSequence("lint", "create:js", callback);
});

// PRIVATE
// lint all js code for PROD
//
gulp.task("create:js", function () {
	if (isProduction) {
		var scriptSource = config.paths.project.root + config.paths.assets.js.all;
		var scriptDestination = config.paths.project.root
			+ config.paths.project.build
			+ config.paths.assets.js.dest;

		var projectScriptBundleFile = config.names.js.project.min;

		return gulp.src(scriptSource)
			.pipe($.sourcemaps.init())
			.pipe($.uglify())
			.pipe($.concat(projectScriptBundleFile))
			.pipe($.header(config.banner.js(), {pkg: config.pkg()}))
			.pipe($.rev())
			.pipe($.sourcemaps.write(''))
			.pipe(gulp.dest(scriptDestination))
	}

	return;
});

// PRIVATE
// lint all js code
//
gulp.task("lint", function () {
	var lintSource = config.paths.project.root + config.paths.assets.js.all;

	return gulp.src(lintSource)
		.pipe($.jshint())
		.pipe($.jshint.reporter("jshint-stylish"))
});