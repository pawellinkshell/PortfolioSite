/**
 * Created by Jan Koszela on 30.05.2017.
 */
var gulp = require("gulp"),
	$ = require("gulp-load-plugins")(),
	config = require("../config"),
	isProduction = config.isProduction();

// PUBLIC
// Prepare distribution
// Get all from 'build/**/out/*' except *.map files
gulp.task("dist", function () {
	if (isProduction) {
		var componentsSource = [
				config.paths.project.root
				+ config.paths.project.build + "/**/out/**/*.*",

				"!" + config.paths.project.root
				+ config.paths.project.build + "/**/out/**/*.map"
			],
			componentDestination = config.paths.project.root
				+ config.paths.project.dist;

		return gulp.src(componentsSource, {base: process.cwd()})
			.pipe($.rename(function (path) {
				path.dirname = path.dirname.replace("out", "");
				path.dirname = path.dirname.replace("build", "");
			}))
			.pipe(gulp.dest(componentDestination));
	}
	return;
});