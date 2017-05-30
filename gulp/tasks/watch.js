/**
 * Created by Jan Koszela on 30.05.2017.
 */
var gulp = require("gulp"),
	$ = require("gulp-load-plugins")(),
	config = require("../config"),
	isProduction = config.isProduction(),
	browserSync = require("browser-sync").create();

gulp.task("watch", function () {
	if (!isProduction) {
		startBrowserSyncServer('');

		// Reloads the browser whenever HTML, LESS, CSS or JS files changed
		gulp.watch(config.paths.project.root + config.paths.assets.less.all,
			['less', browserSync.reload]);
		gulp.watch(config.paths.project.root + config.paths.assets.css.all,
			['styles', browserSync.reload]);
		gulp.watch(config.paths.project.root + config.paths.assets.js.all,
			['scripts', browserSync.reload]);
		gulp.watch(config.paths.project.root + "/" + config.names.html.template,
			['html', browserSync.reload]);

		// Reloads the browser whenever files from resources folder will change
		gulp.watch(config.paths.project.root + config.paths.resources.json.all,
			['data', browserSync.reload]);
		gulp.watch(config.paths.project.root + config.paths.resources.img.all,
			['images', browserSync.reload]);
		gulp.watch(config.paths.project.root + config.paths.resources.video.all,
			['video', browserSync.reload]);

		return;
	} else {
		startBrowserSyncServer(
			config.paths.project.root + config.paths.project.dist
		);
	}

	return;
});

function startBrowserSyncServer(baseDir) {
	browserSync.init({
		server: {
			baseDir: baseDir
		}
	});
}