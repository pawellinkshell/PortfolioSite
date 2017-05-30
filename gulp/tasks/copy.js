/**
 * Created by Jan Koszela on 26.05.2017.
 */
var gulp = require("gulp"),
	config = require("../config");

// PUBLIC
// Copy vendor libraries from /node_modules into /vendor
//
gulp.task("copy", function () {
	getBootstrap();
	getJQuery();
	getFontAwesome();
	getAngularJs();
	getAngularTouch();
	getAngularAnimate();
	getAngularUiBootstrap();

	return;
});

function getBootstrap() {
// Bootstrap
	gulp.src([
		"node_modules/bootstrap/dist/**/*",
		"!**/npm.js",
		"!**/bootstrap-theme.*",
		"!**/*.map"
	])
		.pipe(gulp.dest(
			config.paths.project.root + config.paths.project.vendor + "/bootstrap"))
}
function getJQuery() {
// jQuery
	gulp.src([
		"node_modules/jquery/dist/jquery.js",
		"node_modules/jquery/dist/jquery.min.js"
	])
		.pipe(gulp.dest(
			config.paths.project.root + config.paths.project.vendor + "/jquery"))
}
function getFontAwesome() {
// font-awesome
	gulp.src([
		"node_modules/font-awesome/**",
		"!node_modules/font-awesome/**/*.map",
		"!node_modules/font-awesome/.npmignore",
		"!node_modules/font-awesome/*.txt",
		"!node_modules/font-awesome/*.md",
		"!node_modules/font-awesome/*.json",
		"!node_modules/font-awesome/less/*",
		"!node_modules/font-awesome/less",
		"!node_modules/font-awesome/scss/*",
		"!node_modules/font-awesome/scss"
	])
		.pipe(gulp.dest(config.paths.project.root + config.paths.project.vendor
			+ "/font-awesome"))
}
function getAngularJs() {
// AngularJS
	gulp.src([
		"node_modules/angular/angular.js",
		"node_modules/angular/angular.min.js",
		"node_modules/angular/angular.min.js.map"
	])
		.pipe(gulp.dest(config.paths.project.root + config.paths.project.vendor
			+ "/angularjs"))
}
function getAngularTouch() {
// Angular-touch
	gulp.src([
		"node_modules/angular-touch/angular-touch.js",
		"node_modules/angular-touch/angular-touch.min.js",
		"node_modules/angular-touch/angular-touch.min.js.map"
	])
		.pipe(gulp.dest(config.paths.project.root + config.paths.project.vendor
			+ "/angular-touch"))
}
function getAngularAnimate() {
// Angular-animate
	gulp.src([
		"node_modules/angular-animate/angular-animate.js",
		"node_modules/angular-animate/angular-animate.min.js",
		"node_modules/angular-animate/angular-animate.min.js.map"
	])
		.pipe(gulp.dest(config.paths.project.root + config.paths.project.vendor
			+ "/angular-animate"))
}
function getAngularUiBootstrap() {
// Angular-UI-bootstrap
	gulp.src([
		"node_modules/angular-ui-bootstrap/dist/*"
	])
		.pipe(gulp.dest(config.paths.project.root + config.paths.project.vendor
			+ "/angular-ui-bootstrap"))
}