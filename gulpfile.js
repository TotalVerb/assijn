var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var del = require('del');

var path = {
  HTML: 'src/html/assijn.html',
  JS: 'src/javascript/*.js',
  JULIA: 'src/julia/*.jl',
  SCSS: 'src/css/*.scss',
  REACT: [
    'node_modules/react/dist/*.js',
    'node_modules/react-dom/dist/*.js'
    ],
  MINIFIED_OUT: 'assijn.min.js',
  DEST_SRC: 'lijn-build/',
  DEST_BUILD: 'lijn-build/',
  DEST_TEMP: 'lijn-volatile/cjs',
  DEST: 'lijn-build'
};

gulp.task('julia', function() {
  return gulp.src(path.JULIA)
    .pipe(gulp.dest(path.DEST));
});

gulp.task('react', function() {
  return gulp.src(path.REACT)
    .pipe(gulp.dest(path.DEST));
});

gulp.task('es6-commonjs', function() {
  return gulp.src(path.JS)
    .pipe(babel({
      presets: ['es2015', 'react']
    }))
    .pipe(gulp.dest(path.DEST_TEMP));
});

gulp.task('js-clean', function() {
  return del([path.MINIFIED_OUT]);
});

gulp.task('transform', ['js-clean', 'es6-commonjs'], function() {
  return browserify([path.DEST_TEMP + '/assijn.js']).bundle()
    .pipe(source('assijn.js'))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('sass', function() {
  return gulp.src(path.SCSS)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('htmlcopy', function() {
  return gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

gulp.task('build', ['react', 'transform', 'htmlcopy', 'julia', 'sass']);
