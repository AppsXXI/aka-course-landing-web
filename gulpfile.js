const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', function() {
  console.log('# Task "sass" started...');

  return gulp
    .src('src/scss/style.scss')
    .pipe(sass())
    .pipe(
      gulp.dest('dest/css')
    );
});

gulp.task('html', gulp.series('sass', function() {
  console.log('# Task "html" started...');
  
  return gulp
    .src('src/**/*.html')
    .pipe(
      gulp.dest('dest')
    );
}));

gulp.task('default', gulp.series('html'));
