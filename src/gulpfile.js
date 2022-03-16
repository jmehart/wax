// Sass configuration
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass')(require('sass'));
var jshint 		= require('gulp-jshint');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
  browserSync.init({
      server: "./app"
  });

  gulp.watch("app/scss/*.scss", ['sass']);
  gulp.watch("app/js/*.js", ['jshint']);
  gulp.watch("app/*.*").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("app/scss/*.scss")
      .pipe(sass())
      .pipe(gulp.dest("app/css"))
      .pipe(browserSync.stream())
});

gulp.task('default', ['serve']);

gulp.task('jshint', function() {
return gulp.src('app/js/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});