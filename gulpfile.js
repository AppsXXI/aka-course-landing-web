const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const teddy = require('gulp-teddy');
const teddySettings = {
  setTemplateRoot: 'src/'
};

teddy.settings(teddySettings);

gulp.task('sass', function() {
  console.log('# Task "sass" started...');

  return gulp
    .src('src/scss/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('dest/css'));
});

gulp.task('js', function() {
  console.log('# Task "JS", started...');
  
  return gulp
    .src('src/js/**/*.js')
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dest/js'));
});

gulp.task('html', gulp.series(['sass', 'js'], function() {
  console.log('# Task "html" started...');
  
  return gulp
    .src([
      'src/**/*.html',
      '!src/templates/**/*.html'
    ])
    .pipe(teddy.compile())
    .pipe(gulp.dest('dest'));
}));

gulp.task('default', gulp.series('html'));
