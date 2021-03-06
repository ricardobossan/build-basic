const gulp = require('gulp');
const bSrc = require('browser-sync').create();
const bSpecRunner = require('browser-sync').create();
const bDocumentation = require('browser-sync').create();
const jsdoc = require('gulp-jsdoc3');

/*
const sass = require('gulp-sass');
const autoprefixer('gulp-autoprefixer');
*/

gulp.task('default', ['jsdoc'/*, 'sass:watch'*/], () => {// if using sass, uncomment on this line
	// Reloads browser
	gulp.watch("src/*.html").on('change', bSrc.reload);
	gulp.watch("src/js/*.js").on('change', bSrc.reload);
	gulp.watch("*.html").on('change', bSpecRunner.reload);
	gulp.watch("js/*.js").on('change', bSpecRunner.reload);
	gulp.watch('spec/spec.js').on('change', bSpecRunner.reload);
	gulp.watch("src/**/*.js").on('change', bDocumentation.reload);
	gulp.watch('spec/spec.js').on('change', bDocumentation.reload);

	/** @tutorial https://scotch.io/tutorials/prevent-errors-from-crashing-gulp-watch*/
	// when saving a watched file, the `jsdoc` task takes needs a second save, after a few seconds, to update the documentation
	gulp.watch("js/*.js", ['jsdoc']);
	gulp.watch('spec/spec.js', ['jsdoc']);



	// Servers
	bSrc.init({
		server: "./src",
		port: 3000,
		index: "index.html",
		ui: false

	});
	bSpecRunner.init({
		server: "./",
		port: 8080,
		index: "SpecRunner.html",
		ui: false
	});
	bDocumentation.init({
		server: "./docs/gen",
		port: 8080,
		index: "index.html",
		ui: false
	});
});

// Generates documentation on the `doc` directory
gulp.task('jsdoc', function (cb) {
	gulp.src(['./README.md', './src/**/*.js', './spec/**/*.js'], {read: false})
		.pipe(jsdoc(cb));
});

/*
If creates `dist` directory, for production:
*/
//Copies all files from the `src` directory, as well as the README.md file, to a `dist` folder
//gulp.task('dist', function() {
//	gulp.src(['./src/**/*','./*.md'])
//		.pipe(gulp.dest('./dist'));
//});

/*
If use sass:
*/
//gulp.task('sass', function () {
//	return gulp.src('./sass/**/*.scss')
//		.pipe(sass.sync().on('error', sass.logError))
//		.pipe(autoprefixer({
//			browsers: ['last 2 versions']
//		}))
//		.pipe(gulp.dest('./css'));
//});
//
//gulp.task('sass:watch', function () {
//	gulp.watch('./sass/**/*.scss', ['sass']);
//});