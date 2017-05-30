/**
 * Created by Jan Koszela on 29.05.2017.
 */
var gulp = require("gulp"),
	$ = require("gulp-load-plugins")(),
	runSequence = require("run-sequence"),
	config = require("../config"),
	isProduction = config.isProduction();
	
////////////////////////////////////////////////////////////////////////////////
////////////////    Resources  Management //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// PUBLIC
// Preparing resources
//
gulp.task("resources", function (callback) {
	return runSequence("images", "video", "data", callback);
});

//
// Minify images from "resources" folder
// copy when it is needed
gulp.task("images", function () {
	if (isProduction) {
		var imageSource = config.paths.project.root
			+ config.paths.resources.img.entry;
		var imageDestination = config.paths.project.root
			+ config.paths.project.build
			+ config.paths.resources.img.dest;

		return gulp.src(imageSource)
			.pipe($.changed(imageDestination))
			.pipe($.imagemin())
			.pipe(gulp.dest(imageDestination));
	}
});

//
// copy *.mp4 files from "video" folder
// copy when it is needed
gulp.task("video", function () {
	if (isProduction) {
		var videoSource = config.paths.project.root
			+ config.paths.resources.video.entry;
		var videoDestination = config.paths.project.root
			+ config.paths.project.build
			+ config.paths.resources.video.dest;

		return gulp.src(videoSource)
			.pipe($.changed(videoDestination))
			.pipe(gulp.dest(videoDestination));
	}
});

//
// Copy *.json files from "data" folder
// copy when it is needed
gulp.task("data", function () {
	if (isProduction) {
		var dataSource = config.paths.project.root
			+ config.paths.resources.json.entry;
		var dataDestination = config.paths.project.root + config.paths.project.build
			+ config.paths.resources.json.dest;

		return gulp.src(dataSource)
			.pipe($.changed(dataDestination))
			.pipe(gulp.dest(dataDestination));
	}
});