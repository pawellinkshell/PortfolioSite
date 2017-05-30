/**
 * Created by Jan Koszela on 26.05.2017.
 */
var gulp = require("gulp"),
	$ = require("gulp-load-plugins")(),
	config = require("../config"),
	isProduction = config.isProduction();

// PUBLIC
// Preparing vendor bundle file for project
gulp.task("vendor", function () {
	if (isProduction) {
		getVendorScripts();
		getVendorStyles();
	}

	return;

});

function getVendorScripts() {
// Prepare vendors scripts
	var vendorSource = [
		config.paths.project.root + config.paths.project.vendor + "/**/*min.js",
		config.paths.project.root + config.paths.project.vendor + "/**/*tpls.js"
	];
	var vendorDestination =
		config.paths.project.root + config.paths.project.build
		+ config.paths.vendor.js.dest;

	var sortOrderVendor = [
		"**/*jquery*",
		"**/*bootstrap.*",
		"**/*angular.*"
	];
	var vendorBundleFile = config.names.js.vendor.normal;

	return gulp.src(vendorSource)
		.pipe($.sourcemaps.init({loadMaps: true}))
		.pipe($.order2(sortOrderVendor))
		.pipe($.concat(vendorBundleFile))
		.pipe($.header(config.banner.js(), {pkg: config.pkg()}))
		.pipe($.rev())
		.pipe($.sourcemaps.write(""))
		.pipe(gulp.dest(vendorDestination));
}
function getVendorStyles() {
	// Bootstrap
	var vendorSource = [
		config.paths.project.root + config.paths.project.vendor
		+ "/bootstrap/**/css/*.min*",
		config.paths.project.root + config.paths.project.vendor
		+ "/bootstrap/**/fonts/*.*",
	]

	var vendorDestination =
		config.paths.project.root + config.paths.project.build
		+ config.paths.vendor.css.dest + "/bootstrap/";

	gulp.src(vendorSource)
		.pipe(gulp.dest(vendorDestination));

	//FontAwesome
	vendorSource = [
		config.paths.project.root + config.paths.project.vendor
		+ "/font-awesome/**/css/*.min*",
		config.paths.project.root + config.paths.project.vendor
		+ "/font-awesome/**/fonts/*.*",
	]

	vendorDestination =
		config.paths.project.root + config.paths.project.build
		+ config.paths.vendor.css.dest + "/font-awesome/";

	gulp.src(vendorSource)
		.pipe(gulp.dest(vendorDestination));

	return;
}