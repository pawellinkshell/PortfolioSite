/**
 * Created by Jan Koszela on 30.05.2017.
 */
var gulp = require("gulp"),
	$ = require("gulp-load-plugins")(),
	runSequence = require("run-sequence"),
	config = require("../config"),
	isProduction = config.isProduction();

////////////////////////////////////////////////////////////////////////////////
////////////////    Sources Management //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// PUBLIC
// Preparing sources for production used
//
gulp.task("sources", function (callback) {
	runSequence("prepare:angular:js", "prepare:angular:html", "prepare:server",
		callback);
});

// Copy all from build except: index.html and angular files
gulp.task("prepare:server", function () {
	if (isProduction) {
		var sourceFilesSource = config.paths.project.root
			+ config.paths.app.server.exclude;

		var sourceDestination = config.paths.project.root
			+ config.paths.project.build
			+ config.paths.app.server.dest;

		return gulp.src(sourceFilesSource)
			.pipe(gulp.dest(sourceDestination))
	}

	return;
});

// Concatenate all angular files in order and without minification
gulp.task("prepare:angular:js", function () {
	if (isProduction) {
		var angularSource = config.paths.project.root + config.paths.app.js.all;
		var angularDestination = config.paths.project.root
			+ config.paths.project.build + config.paths.app.js.dest;

		var sortOrderFiles = [
			"**/*.module.js"
		];

		var projectAngularBundleFile = config.names.js.app.normal;

		return gulp.src(angularSource)
			.pipe($.order2(sortOrderFiles))
			.pipe($.concat(projectAngularBundleFile))
			.pipe($.header(config.banner.js(), {pkg: config.pkg()}))
			.pipe($.rev())
			.pipe(gulp.dest(angularDestination))
	}

	return;
});

//Get all angular templates
gulp.task("prepare:angular:html", function () {
	if (isProduction) {
		var angularSource = config.paths.project.root + config.paths.app.html.all;
		var angularDestination = config.paths.project.root
			+ config.paths.project.build + config.paths.app.html.dest;

		return gulp.src(angularSource)
			.pipe(gulp.dest(angularDestination));
	}

	return;
});