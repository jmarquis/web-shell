var pkg = require("./package.json"),
	scripts = require("./scripts.json"),
	styles = require("./styles.json"),
	gulp = require("gulp"),
	rimraf = require("gulp-rimraf"),
	concat = require("gulp-concat"),
	header = require("gulp-header"),
	moment = require("moment"),
	less = require("gulp-less"),
	minifyCss = require("gulp-minify-css"),
	uglify = require("gulp-uglify"),
	express = require("express"),
	livereload = require("gulp-livereload");


gulp.task("clean", function () {

	return gulp.src([
		"./scripts/site.js",
		"./styles/site.css"
	], { read: false })
		.pipe(rimraf());

});

gulp.task("scripts", function () {

	gulp.src(scripts)
		.pipe(concat("site.js"))
		.pipe(header([
			"/**",
			" * ${pkg.name} v${pkg.version}",
			" * " + moment().format("MMDDYYYY hh:mm:ss A X"),
			" */",
			"", "",
		].join("\n"), {pkg: pkg}))
		.pipe(gulp.dest("./scripts/"));

});

gulp.task("styles", function () {

	return gulp.src(styles)
		.pipe(concat("site.less"))
		.pipe(less())
		.pipe(header([
			"/**",
			" * ${pkg.name} v${pkg.version}",
			" * " + moment().format("MMDDYYYY hh:mm:ss A X"),
			" */",
			"", "",
		].join("\n"), {pkg: pkg}))
		.pipe(gulp.dest("./styles/"));

});

gulp.task("build", ["scripts", "styles"]);

gulp.task("compress", function () {

	gulp.src("./scripts/site.js")
		.pipe(uglify())
		.pipe(gulp.dest("./scripts/"));

	gulp.src("./styles/site.css")
		.pipe(minifyCss())
		.pipe(gulp.dest("./styles/"));

});

gulp.task("run", function () {

	var app = express();
	app.use(express.static(__dirname));
	app.listen(29017);
	console.log("Server running on localhost:29017");

});

gulp.task("watch", ["build"], function () {

	livereload.listen();

	gulp.watch(scripts, ["scripts"]);
	gulp.watch(styles, ["styles"]);
	gulp.watch(["*.html"], function () {
		setTimeout(function () {
			livereload.changed();
		}, 100)
	});

	gulp.on("stop", function () {
		setTimeout(function () {
			livereload.changed();
		}, 100);
	});

});

gulp.task("default", ["build"]);
