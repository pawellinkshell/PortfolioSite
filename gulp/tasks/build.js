/**
 * Created by Jan Koszela on 30.05.2017.
 */
var gulp = require("gulp"),
	runSequence = require("run-sequence");

gulp.task("build", function (callback) {
	runSequence(
		"clean",
		[
			"styles",
			"scripts",
			"resources",
			"sources",
			"vendor"
		],
		"dist",
		"html",
		"test",
		callback);
});