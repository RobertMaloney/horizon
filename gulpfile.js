var uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    react = require('gulp-react');

var gulp = require('gulp');

gulp.task('minify:css', function() {
  return gulp.src('./src/css/**/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/css/'))
});

gulp.task('minify:js', function() {
  // jsx and uglify react
  gulp.src('./src/js/**/*.jsx')
    .pipe(react())
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'))

  // uglify main.js
  gulp.src('./src/main.js')
  .pipe(uglify())
  .pipe(gulp.dest('./build/'))

  return gulp.src('./src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'))
});

gulp.task('build:copy', function() {
  return gulp.src('./src/main.html')
    .pipe(gulp.dest('./build/'))
});

gulp.task('build', ['minify:js', 'minify:css', 'build:copy']);
