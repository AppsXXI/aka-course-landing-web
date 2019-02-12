const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const teddy = require('gulp-teddy');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const teddySettings = {
  setTemplateRoot: 'src/'
};

teddy.settings(teddySettings);

gulp.task('sass', function () {
  console.log('# Task "sass" started...');

  return gulp
    .src('src/scss/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('.tmp/css'))
    .pipe(reload({ stream: true }));
});

gulp.task('js', function () {
  console.log('# Task "JS", started...');
  
  return gulp
    .src('src/js/**/*.js')
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('.tmp/js'))
    .pipe(reload({ stream: true }));
});

gulp.task('html', gulp.series(['sass', 'js'], function () {
  console.log('# Task "html" started...');
  
  return gulp
    .src([
      'src/**/*.html',
      '!src/templates/**/*.html'
    ])
    .pipe(teddy.compile())
    .pipe(gulp.dest('.tmp'))
    .pipe(reload({ stream: true }));
}));

gulp.task('watch', gulp.series('html', function (cb) {
  gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('src/js/**/*.js', gulp.series('js'));
  gulp.watch('src/**/*.html', gulp.series('html'));
  cb();
}));

gulp.task('serve', gulp.series('watch', function () {
  browserSync({
    server: {
      baseDir: ['.tmp']
    }
  });
}));

gulp.task('default', gulp.series('html'));
