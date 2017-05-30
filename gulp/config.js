/**
 * Created by Jan Koszela on 26.05.2017.
 */
module.exports = {
	paths: {
		project: {
			root: ".",
			src: "/src",
			resources: "/resources",
			test: "/test",
			build: "/build",
			dist: "/dist",
			assets: "/src/assets",
			vendor: "/src/vendor",
			server: "/src/server",
			app: "/src/angular",
			data: "/resources/data",
			media: "/resources/media"
		},
		assets: {
			css: {
				entry: "/src/assets/styles/css/out/project*.css",
				all: "/src/assets/styles/css/**/*.css",
				exclude: "/src/assets/styles/css/**/_*.css",
				src: "/src/assets/styles/css",
				dest: "/src/assets/styles/css/out"
			},
			less: {
				entry: "/src/assets/styles/less/out/*.less",
				all: "/src/assets/styles/less/**/*.less",
				exclude: "/src/assets/styles/less/**/_*.less",
				src: "/src/assets/styles/less",
				dest: "/src/assets/styles/less/out"
			},
			scss: {
				entry: "/src/assets/styles/scss/out/*.+(scss|sass)",
				all: "/src/assets/styles/scss/**/*.+(scss|sass)",
				exclude: "/src/assets/styles/scss/**/_*.+(scss|sass)",
				src: "/src/assets/styles/scss",
				dest: "/src/assets/styles/scss/out"
			},
			js: {
				entry: "/src/assets/scripts/js/out/project*.js",
				all: "/src/assets/scripts/js/**/*.js",
				exclude: "/src/assets/scripts/js/**/_*.js",
				src: "/src/assets/scripts/js",
				dest: "/src/assets/scripts/js/out"
			}
		},
		vendor: {
			css: {
				entry: "/src/vendor/out/**/*.css",
				all: "/src/vendor/**/*.css",
				src: "/src/vendor",
				dest: "/src/vendor/out"
			},
			js: {
				entry: "/src/vendor/out/**/*.js",
				all: "/src/vendor/**/*.js",
				src: "/src/vendor",
				dest: "/src/vendor/out"
			}
		},
		resources: {
			img: {
				entry: "/resources/media/img/**/*.+(jpg|png)",
				all: "/resources/media/img/**/*.+(jpg|png|svg)",
				exclude: "/resources/media/img/**/_*.+(jpg|png|svg)",
				src: "/resources/media/img",
				dest: "/resources/media/img/out"
			},
			video: {
				entry: "/resources/media/video/**/*.mp4",
				all: "/resources/media/video/**/*.mp4",
				exclude: "/resources/media/video/**/_*.mp4",
				src: "/resources/media/video",
				dest: "/resources/media/video/out"
			},
			json: {
				entry: "/resources/data/**/*.+(json|xml)",
				all: "/resources/data/**/*.+(json|xml)",
				exclude: "/resources/data/**/_*.+(json|xml)",
				src: "/resources/data",
				dest: "/resources/data/out"
			}
		},
		app: {
			server: {
				entry: "/src/server/out/**/*.*",
				all: "/src/server/**/*.*",
				exclude: "/src/server/**/*.*",
				src: "/src/server",
				dest: "/src/server/out"
			},
			html: {
				entry: "/src/angular/out/**/*.+(html|htm)",
				all: "/src/angular/**/*.+(html|htm)",
				exclude: "/src/angular/**/_*.+(html|htm)",
				src: "/src/angular",
				dest: "/src/angular/out"
			},
			js: {
				entry: "/src/angular/out/**/*.js",
				all: "/src/angular/**/*.js",
				exclude: "/src/angular/**/_*.js",
				src: "/src/angular",
				dest: "/src/angular/out"
			}
		}
	},
	names: {
		css: {
			project: {
				normal: "project.bundle.css",
				min: "project.bundle.min.css"
			},
			vendor: {
				normal: "vendor.bundle.css",
				min: "vendor.bundle.min.css"
			},
		},
		js: {
			app: {
				normal: "app.bundle.js",
				min: "app.bundle.min.js"
			},
			project: {
				normal: "project.bundle.js",
				min: "project.bundle.min.js"
			},
			vendor: {
				normal: "vendor.bundle.js",
				min: "vendor.bundle.min.js"
			}
		},
		html: {
			template: "index.template.html",
			index: "index.html"
		}
	},
	banner: {
		html : function () {
			return ['<!--\n',
				' PortfolioSite - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
				' Copyright ' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
				' Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
				' -->\n',
				''
			].join('');
		},
		js: function () {
			return ['/*\n',
				' * PortfolioSite - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
				' * Copyright ' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
				' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
				' */\n',
				''
			].join('');
		}
	},
	pkg: function(){
		return require('../package.json')
	},
	isProduction: function () {
		return (require("yargs").argv).production ? true : false;
	}

};
