/**
 * Created by Jan Koszela on 29.05.2017.
 */
var gulp = require("gulp"),
	$ = require("gulp-load-plugins")(),
	del = require('del'),
	config = require("../config"),
	isProduction = config.isProduction(),
	autoprefixerOptions = {
		browsers: ["safari 5", "firefox 20", "ie 8", "opera 12.1", "ios 6",
			"android 4"]
	};

////////////////////////////////////////////////////////////////////////////////
////////////////    StyleSheet Management //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

gulp.task("styles", ["less"], function () {
	var stylesSource = (isProduction) ? config.paths.project.root
		+ config.paths.project.build + config.paths.assets.css.all
		: config.paths.project.root
		+ config.paths.assets.css.all;

	var stylesDestination = (isProduction) ? config.paths.project.root
		+ config.paths.project.build + config.paths.assets.css.dest
		: config.paths.project.root
		+ config.paths.assets.css.dest;

	console.log("Is production build: " + isProduction);

	if (isProduction) {
		return gulp.src(stylesSource)
			.pipe($.sourcemaps.init({loadMaps: true}))    // create maps from less/scss *sourcemaps* not the css
			.pipe($.cleanCss({compatibility: 'ie8', rebase: false}))
			.pipe($.rename({suffix: '.min'}))
			.pipe($.rev())
			.pipe($.sourcemaps.write(''))
			.pipe(gulp.dest(stylesDestination)); // put css artifact
	} else {
		return gulp.src(stylesSource)
	}

});

// PRIVATE
// Compile LESS files from /less into /css
//
gulp.task("less", function () {
	var lessSource = [
		config.paths.project.root + config.paths.assets.less.all,
		"!" + config.paths.project.root + config.paths.assets.less.exclude
	];
	var lessDestination = (isProduction) ? config.paths.project.root
		+ config.paths.project.build
		+ config.paths.assets.css.src
		: config.paths.project.root
		+ config.paths.assets.css.src;

	var lessBundleFile = config.names.css.project.normal;

	return gulp.src(lessSource)
		.pipe($.sourcemaps.init())
		.pipe($.less())
		.pipe($.if(isProduction, $.concat(lessBundleFile)))   // if PROD concat
		.pipe($.header(config.banner.js(), {pkg: config.pkg()}))
		.pipe($.autoprefixer(autoprefixerOptions))
		.pipe($.sourcemaps.write(""))
		.pipe(gulp.dest(lessDestination))
});

gulp.task("sass", function () {
	var sassSource = [
		config.paths.project.root + config.paths.assets.scss.all,
		"!" + config.paths.project.root + config.paths.assets.scss.exclude,
	];
	var sassDestination = (isProduction) ? config.paths.project.root
		+ config.paths.project.build
		+ config.paths.assets.css.src
		: config.paths.project.root
		+ config.paths.assets.css.src;

	var sassBundleFile = config.names.css.project.normal;

	return gulp.src(sassSource)
	// .pipe(sourcemaps.init())		//FIXME: Cannot run build, due to this issue
		.pipe(sass())
		.pipe(gulpif(isProduction, concat(sassBundleFile)))   // if PROD concat
		.pipe(header(config.banner.js(), {pkg: config.pkg()}))
		.pipe(autoprefixer(autoprefixerOptions))
		// .pipe(sourcemaps.write(""))
		.pipe(gulp.dest(sassDestination))
});
