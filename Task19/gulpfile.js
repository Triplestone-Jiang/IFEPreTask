var gulp = require('gulp')
var browserify = require('browserify')
var babelify = require('babelify')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var uglify = require('gulp-uglify')
var sourcemaps = require('gulp-sourcemaps')
var livereload = require('gulp-livereload')
var sass = require('gulp-sass')
 
gulp.task('build', function () {
	return browserify({entries: './src/js/main.js', debug: true})
		.transform("babelify", { presets: ["es2015"] })
		.bundle()
		.pipe(source('main.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./dist/js'))
		.pipe(livereload());
});

gulp.task('sass', function () {
	return gulp.src('src/style/style.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./dist/style'))
		.pipe(livereload())
})

gulp.task('html', function () {
	return gulp.src('*.html')
		.pipe(livereload())
})

gulp.task('watch', ['build','html','sass'], function () {
	livereload.listen();
	gulp.watch('./src/js/*.js', ['build']);
	gulp.watch('*.html', ['html'])
	gulp.watch('./src/style/*.scss', ['sass'])
});
 
gulp.task('default', ['watch']);