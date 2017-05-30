/**
 * Created by Jan Koszela on 30.05.2017.
 */
var gulp = require("gulp"),
	$ = require("gulp-load-plugins")(),
	config = require("../config"),
	isProduction = config.isProduction();

// PUBLIC
// Preparing index.html
//
gulp.task("html", function () {

	// selects all *.css files from vendor
	var injectVendorStyles = getVendorStyleSource();

	// selects all *.js file from vendor and set it in order
	var injectVendorScripts = getVendorScriptSource();

	// selects all *.css file from project
	var injectProjectStyles = getProjectStyleSource();

	// selects all *.js file from project
	var injectJavascript = getProjectJavascriptSource();

	// select all angular base *.js files from "src" and set it in order
	var injectAngularScripts = getAngularScriptSource();

	var indexSource = config.paths.project.root + "/"
		+ config.names.html.template;

	var indexDestination =
		(isProduction) ? config.paths.project.root + config.paths.project.dist
			: config.paths.project.root + "/";

	// Inject all into html
	return gulp.src(indexSource)
		.pipe($.header(config.banner.html(), {pkg: config.pkg()}))
		.pipe($.rename({basename: "index"}))
		.pipe($.inject(
			injectVendorStyles,
			{name: "inject:vendor", relative: true, ignorePath: "dist"}))
		.pipe($.inject(
			injectProjectStyles,
			{name: "inject:project", relative: true, ignorePath: "dist"}))
		.pipe($.inject(
			injectVendorScripts,
			{name: "inject:body:vendor", relative: true, ignorePath: "dist"}))
		.pipe($.inject(
			injectJavascript,
			{name: "inject:body:javascript", relative: true, ignorePath: "dist"}))
		.pipe($.inject(
			injectAngularScripts,
			{name: "inject:body:angular", relative: true, ignorePath: "dist"}))
		.pipe(gulp.dest(indexDestination));
});

function getVendorStyleSource() {
	var vendorStylesSource =
			[
				(isProduction) ? config.paths.project.root
					+ config.paths.project.dist + config.paths.vendor.css.all
					: config.paths.project.root + config.paths.vendor.css.src
					+ "/**/*.css",

				(isProduction) ? ""
					: "!" + config.paths.project.root + config.paths.vendor.js.src
					+ "/**/*.min.css",

				(isProduction) ? ""
					: "!" + config.paths.project.root + config.paths.vendor.js.src
					+ "/**/*-csp.css"

			],
		sortOrderVendor = [
			"**/*bootstrap.*"
		];

	return gulp.src(vendorStylesSource)
		.pipe($.order2(sortOrderVendor));
}
function getVendorScriptSource() {
	var vendorScriptsSource = [
			(isProduction) ? config.paths.project.root
				+ config.paths.project.dist + config.paths.vendor.js.all
				: config.paths.project.root + config.paths.vendor.js.src
				+ "/**/*.js",

			(isProduction) ? ""
				: "!" + config.paths.project.root + config.paths.vendor.js.src
				+ "/**/*.min.js",

			(isProduction) ? ""
				: "!" + config.paths.project.root + config.paths.vendor.js.src
				+ "/**/ui-bootstrap.js"
		],

		sortOrderVendor = [
			"**/*jquery*",
			"**/*bootstrap.*",
			"**/*angular.*"
		];

	return gulp.src(vendorScriptsSource)
		.pipe($.order2(sortOrderVendor));
}
function getProjectStyleSource() {
	var projectStylesSource =
		(isProduction) ? config.paths.project.root
			+ config.paths.project.dist + config.paths.assets.css.all
			: config.paths.project.root + config.paths.assets.css.all
	;

	return gulp.src(projectStylesSource);
}
function getProjectJavascriptSource() {
	var projectJavascriptSource =
		(isProduction) ? config.paths.project.root
			+ config.paths.project.dist + config.paths.assets.js.all
			: config.paths.project.root + config.paths.assets.js.all
	;

	return gulp.src(projectJavascriptSource);
}
function getAngularScriptSource() {
	var angularScriptSource =
			(isProduction) ? config.paths.project.root
				+ config.paths.project.dist + config.paths.app.js.all
				: config.paths.project.root + config.paths.app.js.all,

		sortOrderFiles = [
			"**/app.module.js",
			"**/*.module.js"
		]
	;

	return gulp.src(angularScriptSource)
		.pipe($.order2(sortOrderFiles));
}