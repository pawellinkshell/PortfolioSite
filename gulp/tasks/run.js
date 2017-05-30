/**
 * Created by Jan Koszela on 31.05.2017.
 */
var gulp = require("gulp"),
	$ = require("gulp-load-plugins")(),
	config = require("../config"),
	runSequence = require("run-sequence");

// Run browser server
gulp.task("run", function () {
	runSequence("build", "watch");
});