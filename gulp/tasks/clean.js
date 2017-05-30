/**
 * Created by Jan Koszela on 26.05.2017.
 */
var gulp = require("gulp"),
	config = require("../config"),
	del = require("del");

// PUBLIC
// cleaning every artifacts in project
//
gulp.task("clean", function () {
	return del([
		config.paths.project.root + config.paths.project.build,			// 'build'
		config.paths.project.root + config.paths.project.dist,			// 'dist'
		config.paths.project.root + config.paths.assets.css.dest,		// 'src/../css'
		config.paths.project.root + config.paths.assets.css.src,		// 'src/../css'
		config.paths.project.root + config.paths.assets.less.dest,	// 'src/../less'
		config.paths.project.root + config.paths.assets.scss.dest,	// 'src/../scss'
		config.paths.project.root + config.paths.assets.js.dest,		// 'src/../js
		config.paths.project.root + '/' + config.names.html.index		// './index.html'
	]);
});