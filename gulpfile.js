const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const teddy = require('gulp-teddy');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const teddySettings = {
  setTemplateRoot: 'src/',
  compileAtEveryRender: true,
};

teddy.settings(teddySettings);

gulp.task('sass', function () {
  console.log('# Task "sass" started...');

  return gulp
    .src('src/scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
    .pipe(sourcemaps.write())
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

gulp.task('assets', function() {
  console.log('# Task "assets" started...');

  return gulp
    .src('src/assets/**/*')
    .pipe(gulp.dest('.tmp/assets'))
    .pipe(reload({ stream: true }));
});

gulp.task('fonts', function() {
  console.log('# Task "fonts" started...');

  return gulp
    .src([
      'src/fonts/*',
      'node_modules/@fortawesome/fontawesome-free/webfonts/*'
    ])
    .pipe(gulp.dest('.tmp/webfonts'));
});

gulp.task('html', gulp.series(['sass', 'js', 'assets', 'fonts'], function () {
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

gulp.task('watch', gulp.series('html', function (done) {
  gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('src/js/**/*.js', gulp.series('js'));
  gulp.watch('src/assets/**/*', gulp.series('assets'));
  gulp.watch('src/**/*.html', gulp.series('html'));
  done();
}));

gulp.task('serve', gulp.series('watch', function () {
  browserSync({
    server: {
      baseDir: ['.tmp'],
    }
  });
}));

gulp.task('default', gulp.series('html'));
